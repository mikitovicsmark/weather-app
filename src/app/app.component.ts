import { Component } from '@angular/core';
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'wa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cityData = {};
  constructor(private apiService: WeatherApiService) {
    this.apiService.getCityData('London').subscribe(data => (this.cityData = data));
  }
}
