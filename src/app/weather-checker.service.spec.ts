import { TestBed, inject } from '@angular/core/testing';

import { WeatherCheckerService } from './weather-checker.service';

describe('WeatherCheckerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherCheckerService]
    });
  });

  it('should be created', inject([WeatherCheckerService], (service: WeatherCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
