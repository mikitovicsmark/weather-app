import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSliderModule, MatFormFieldModule, MatProgressSpinnerModule, MatSlideToggleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherApiService } from './weather-api.service';
import { SliderComponent } from './slider/slider.component';
import { SliderFilterComponent } from './slider-filter/slider-filter.component';
import { WeatherCheckerService } from './weather-checker.service';

@NgModule({
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
    MatSlideToggleModule
  ],
  providers: [WeatherApiService, WeatherCheckerService, { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
