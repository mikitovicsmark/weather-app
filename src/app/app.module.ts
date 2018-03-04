import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSliderModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherApiService } from './weather-api.service';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [AppComponent, SliderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatSliderModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [WeatherApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
