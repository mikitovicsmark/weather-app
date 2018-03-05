import { Component } from '@angular/core';
import { WeatherApiService } from './weather-api.service';
import { WeatherCheckerService } from './weather-checker.service';
import { FilterData } from './models/filter-data';
import { Observable } from 'rxjs/Observable';

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

  constructor(private apiService: WeatherApiService, private checkerService: WeatherCheckerService) {
    this.filters = this.checkerService.getFilters();
    this.checkerService.weatherStatus().subscribe(value => {
      this.niceWeather = value;
    });
    this.apiService.getCityData('London').subscribe(data => {
      this.iconSrc = `http://openweathermap.org/img/w/${data['weather'][0].icon}.png`;
      this.cityData = data;
    });
  }
}
