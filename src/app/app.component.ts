import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
  private loading = false;
  private niceWeather: boolean;
  private cityLocation = '';
  private cityLocationSubject: Subject<string> = new Subject();
  private apiSubscription: Subscription;

  constructor(
    private apiService: WeatherApiService,
    private checkerService: WeatherCheckerService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedLocation = this.localStorage.getItem('waLocation');
      if (storedLocation) {
        this.cityLocation = storedLocation;
        setTimeout(() => this.cityLocationSubject.next(this.cityLocation), 0);
      }
    }
    this.filters = this.checkerService.getFilters();
    this.checkerService.weatherStatus().subscribe(value => {
      this.niceWeather = value;
    });
    this.cityLocationSubject.subscribe(location => {
      if (this.apiSubscription) {
        this.apiSubscription.unsubscribe();
      }
      this.apiSubscription = this.apiService.getCityData(location).subscribe(data => {
        this.iconSrc = `http://openweathermap.org/img/w/${data['weather'][0].icon}.png`;
        this.cityData = data;
        this.checkerService.setCityData(data);
        this.checkerService.checkWeather();
      });
    });
  }

  locationChange() {
    this.localStorage.setItem('waLocation', this.cityLocation);
    this.cityLocationSubject.next(this.cityLocation);
  }

  getLocation() {
    this.loading = true;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.apiSubscription = this.apiService
            .getCityDataByCoordinates({ lat: pos.coords.latitude, lon: pos.coords.longitude })
            .subscribe(data => {
              this.iconSrc = `http://openweathermap.org/img/w/${data['weather'][0].icon}.png`;
              this.cityData = data;
              this.cityLocation = data['name'];
              this.localStorage.setItem('waLocation', this.cityLocation);
              this.loading = false;
              this.checkerService.checkWeather();
            });
        },
        err => {
          this.loading = false;
        },
      );
    }
  }
}
