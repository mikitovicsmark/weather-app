import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SliderFilterComponent } from './slider-filter/slider-filter.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatSliderModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatButtonModule,
} from '@angular/material';
import { WeatherApiService } from './weather-api.service';
import { WeatherCheckerService } from './weather-checker.service';
import { HttpClientModule } from '@angular/common/http';
import { defaultFilterData } from './default-filter-data';
import { Subject } from 'rxjs/Subject';
import { fakeCityData } from './fake-city-data';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
fdescribe('AppComponent', () => {
  const localstorage = [];
  const localstorageStub = {
    aaa: (x) => x,
    setItem: (key, value) => (localstorage[key] = value),
    getItem: key => (localstorage[key] ? localstorage[key] : null),
  };
  let cityData = [];
  const weatherSubject = new Subject<boolean>();
  const checkerServiceStub: Partial<WeatherCheckerService> = {
    getFilters: () => defaultFilterData,
    weatherStatus: () => weatherSubject,
    setCityData: data => (cityData = data),
    checkWeather: () => null,
  };
  const apiServiceStub: Partial<WeatherApiService> = {
    getCityData: () => {
      return Observable.create(observer => {
        observer.next(fakeCityData);
      });
    },
    getCityDataByCoordinates: () => {
      return Observable.create(observer => {
        observer.next(fakeCityData);
      });
    },
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent, SliderComponent, SliderFilterComponent],
        imports: [
          FormsModule,
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatInputModule,
          MatSliderModule,
          MatFormFieldModule,
          MatProgressSpinnerModule,
          MatSlideToggleModule,
          MatButtonModule,
        ],
        providers: [
          { provide: WeatherApiService, useValue: apiServiceStub },
          { provide: WeatherCheckerService, useValue: checkerServiceStub },
          { provide: 'LOCALSTORAGE', useValue: localstorageStub },
        ],
      }).compileComponents();
    }),
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    'should react to location change',
    async((done) => {
      const fixture = TestBed.createComponent(AppComponent);
      const fakeLocalStorage = fixture.debugElement.injector.get('LOCALSTORAGE');
      const fakeApiService = fixture.debugElement.injector.get(WeatherApiService);
      const fakeCheckerService = fixture.debugElement.injector.get(WeatherCheckerService);
      spyOn(fakeLocalStorage, 'setItem');
      spyOn(fakeCheckerService, 'setCityData');
      spyOn(fakeCheckerService, 'checkWeather');
      fixture.detectChanges();
      const app = fixture.debugElement;
      const locationInput = app.query(By.css('input'));
      const locationInputElement = locationInput.nativeElement as HTMLInputElement;

      locationInputElement.value = 'London';
      locationInputElement.dispatchEvent(new Event('change'));

      expect(fakeLocalStorage.setItem).toHaveBeenCalled();
      expect(fakeCheckerService.setCityData).toHaveBeenCalled();
      expect(fakeCheckerService.checkWeather).toHaveBeenCalled();
    }),
  );
});
