import { TestBed, async } from '@angular/core/testing';
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
fdescribe('AppComponent', () => {
  const localstorage = [];
  const localstorageStub = {
    setItem: (key, value) => localstorage[key] = value,
    getItem: (key) => localstorage[key] ? localstorage[key] : null,
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
        providers: [WeatherApiService, WeatherCheckerService, { provide: 'LOCALSTORAGE', useValue: localstorageStub }],
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
});
