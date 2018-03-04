import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class WeatherApiService {
  baseApi = 'http://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) {}

  getCityData(cityName: string) {
    return this.http.get(`${this.baseApi}q=${cityName}&APPID=${environment.weather_api_key}`);
  }

  getCityDataByCoordinates({ lat, lon }: { lat: number, lon: number }) {
    return this.http.get(`${this.baseApi}lat=${lat}&lon=${lon}&APPID=${environment.weather_api_key}`);
  }
}
