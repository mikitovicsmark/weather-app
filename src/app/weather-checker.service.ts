import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { FilterData } from './models/filter-data';
import { WeatherApiService } from './weather-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { defaultFilterData } from './default-filter-data';

@Injectable()
export class WeatherCheckerService {
  private filterData: FilterData[];
  private cityData: Object;
  private isNiceWeather: Subject<boolean> = new Subject();

  constructor(
    private apiService: WeatherApiService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedFilterData = JSON.parse(this.localStorage.getItem('waFilterData'));
      if (storedFilterData) {
        this.filterData = storedFilterData;
        this.filterData.forEach(data => {
          switch (data.label) {
            case 'Temperature':
              data.converter = (x) => x - 272;
              break;
            default:
              data.converter = (x) => x;
              break;
          }
        });
      } else {
        this.filterData = defaultFilterData;
      }
    } else {
      this.filterData = defaultFilterData;
    }
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
    console.log(index);
    this.filterData[index].checked = !this.filterData[index].checked;
    this.saveFilterData();
  }

  setFilterValue(label, value) {
    const filterData = _.find(this.filterData, filter => filter.label === label);
    filterData.value = value;
    this.saveFilterData();
  }

  weatherStatus() {
    return this.isNiceWeather;
  }

  saveFilterData() {
    this.localStorage.setItem('waFilterData', JSON.stringify(this.filterData));
    this.checkWeather();
  }
}
