import { Injectable } from '@angular/core';
import { FilterData } from './models/filter-data';
import { WeatherApiService } from './weather-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WeatherCheckerService {
  private filterData: FilterData[];
  private cityData: Object;
  private isNiceWeather: Subject<boolean> = new Subject();
  constructor(private apiService: WeatherApiService) {
    this.filterData = [
      {
        label: 'Temperature',
        path: 'main.temp',
        value: 20,
        format: '°C',
        min: -15,
        max: 40,
        tolerance: 5,
        checked: false,
        converter: x => x - 272,
      },
      {
        label: 'Humidity',
        path: 'main.humidity',
        value: 25,
        format: '%',
        min: 0,
        max: 100,
        tolerance: 5,
        checked: false,
        converter: x => x,
      },
      {
        label: 'Cloudiness',
        path: 'clouds.all',
        value: 0,
        format: '%',
        min: 0,
        max: 100,
        tolerance: 5,
        checked: false,
        converter: x => x,
      },
      { label: 'Rain', path: 'rain.3h', value: 15, format: 'mm', min: 0, max: 100, tolerance: 5, checked: false, converter: x => x },
    ];
    this.apiService.getCityData('London').subscribe(data => {
      this.cityData = data;
    });
  }

  getFilters() {
    return this.filterData;
  }

  checkWeather() {
    const filterResult = this.filterData.some(filter => {
      const cityParameter = filter.converter(_.get(this.cityData, filter.path)) || 0;
      if (
        filter.checked &&
        (cityParameter > filter.value + filter.tolerance || cityParameter < filter.value - filter.tolerance)
      ) {
        return true;
      }
    });
    this.isNiceWeather.next(!filterResult);
  }

  toggleFilter(index) {
    this.filterData[index].checked = !this.filterData[index].checked;
    this.checkWeather();
  }

  setFilterValue(label, value) {
    const filterData = _.find(this.filterData, (filter) => filter.label === label);
    filterData.value = value;
    this.checkWeather();
  }

  weatherStatus() {
    return this.isNiceWeather;
  }
}
