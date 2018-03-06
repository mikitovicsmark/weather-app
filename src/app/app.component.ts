import { Component } from '@angular/core';
import { WeatherApiService } from './weather-api.service';
import { WeatherCheckerService } from './weather-checker.service';
import { FilterData } from './models/filter-data';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'wa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private cityData: Object = {};
  private iconSrc = '';
  private filters: FilterData[];
  private niceWeather = true;
  private cityLocation = '';
  private cityLocationSubject: Subject<string> = new Subject();
  private apiSubscription: Subscription;

  constructor(private apiService: WeatherApiService, private checkerService: WeatherCheckerService) {
    this.filters = this.checkerService.getFilters();
    this.checkerService.weatherStatus().subscribe(value => {
      this.niceWeather = value;
    });
    this.cityLocationSubject.subscribe(location => {
      if (this.apiSubscription) { this.apiSubscription.unsubscribe(); }
      this.apiSubscription = this.apiService.getCityData(location).subscribe(data => {
        this.iconSrc = `http://openweathermap.org/img/w/${data['weather'][0].icon}.png`;
        this.cityData = data;
        this.checkerService.checkWeather();
      });
    });
  }

  locationChange() {
    this.cityLocationSubject.next(this.cityLocation);
  }
}
