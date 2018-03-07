import { TestBed, inject } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';

describe('WeatherApiService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let apiService: WeatherApiService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new WeatherApiService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });
});
