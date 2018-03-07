import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import * as _ from 'lodash';

import { WeatherCheckerService } from './weather-checker.service';
import { WeatherApiService } from './weather-api.service';
import { fakeCityData } from './fake-city-data';
import { Subject } from 'rxjs/Subject';
import { PLATFORM_ID } from '@angular/core';
import { defaultFilterData } from './default-filter-data';
import { FilterType } from './enums/filters';

describe('WeatherCheckerService', () => {
  let weatherCheckerService: WeatherCheckerService;
  const apiSubject = new Subject();
  const apiServiceStub: any = {
    getCityData: (location) => apiSubject,
  };
  const isPlatformBrowser = x => x;
  const platformIdStub = 'browser';
  const localstorage = [];
  const localstorageStub = {
    setItem: (key, value) => localstorage[key] = value,
    getItem: (key) => localstorage[key] ? localstorage[key] : null,
  };
  beforeEach(() => {
    spyOn(localstorageStub, 'getItem').and.returnValue(JSON.stringify(defaultFilterData));
    weatherCheckerService = new WeatherCheckerService(apiServiceStub, platformIdStub, localstorageStub);
    weatherCheckerService.setCityData(_.cloneDeep(fakeCityData));
  });

  it('should be created', () => {
    expect(weatherCheckerService).toBeTruthy();
  });

  it('should return nice weather based on settings', done => {
    weatherCheckerService.weatherStatus().subscribe(res => {
      expect(res).toBe(true);
      done();
    });
    const goodCityData = _.cloneDeep(fakeCityData);
    goodCityData.main.temp = 292;
    goodCityData.main.humidity = 28;
    goodCityData.clouds.all = 0;
    goodCityData.rain['3h'] = 15;

    weatherCheckerService.setCityData(goodCityData);
    weatherCheckerService.checkWeather();
  });

  it('should return bad weather based on settings', done => {
    weatherCheckerService.weatherStatus().subscribe(res => {
      expect(res).toBe(false);
      done();
    });

    weatherCheckerService.checkWeather();
  });


  it('should return bad weather first, and nice weather after using service functions', done => {
    const weatherResults = [];
    weatherCheckerService.weatherStatus().subscribe(res => {
      weatherResults.push(res);
      if (weatherResults.length === 5) {
        expect(weatherResults).toEqual([false, false, false, false, true]);
        done();
      }
    });

    weatherCheckerService.checkWeather();

    weatherCheckerService.setFilterValue(FilterType.Temperature, 10);
    weatherCheckerService.setFilterValue(FilterType.Humidity, 75);
    weatherCheckerService.setFilterTolerance(FilterType.Clouds, 75);
    weatherCheckerService.setFilterValue(FilterType.Rain, 0);

  });

  it('should return nice weather if everything is turned off', done => {
    const weatherResults = [];
    weatherCheckerService.weatherStatus().subscribe(res => {
      weatherResults.push(res);
      if (weatherResults.length === 4) {
        expect(weatherResults).toEqual([false, false, false, true]);
        done();
      }
    });

    for (let i = 0; i < 4; i ++) {
      weatherCheckerService.toggleFilter(i);
    }
  });
});
