import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherApiService } from './weather-api.service';
import { TemperatureSliderComponent } from './temperature-slider/temperature-slider.component';

@NgModule({
  declarations: [AppComponent, TemperatureSliderComponent],
  imports: [BrowserModule, HttpClientModule, MatSliderModule],
  providers: [WeatherApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
