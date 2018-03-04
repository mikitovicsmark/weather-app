import { Component } from '@angular/core';
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'wa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cityData = {};
  iconSrc = '';
  weather = 'The weather is nice today.';

  filters = [
    { label: 'Temperature', parameter: 'main\.temp', min: -15, max: 40, tolerance: 5 },
    { label: 'Humidity', parameter: 'main\.humidity', min: 0, max: 100, tolerance: 5 },
    { label: 'Cloudiness', parameter: 'clouds\.all', min: 0, max: 100, tolerance: 5 },
    { label: 'Rain', parameter: 'rain\.3h', min: 0, max: 100, tolerance: 5 },
  ];

  constructor(private apiService: WeatherApiService) {
    this.apiService.getCityData('London').subscribe(data => {
      this.iconSrc = `http://openweathermap.org/img/w/${data['weather'][0].icon}.png`;
      this.cityData = data;
    });
  }
}
