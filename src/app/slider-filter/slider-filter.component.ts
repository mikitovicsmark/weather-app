import { Component, Input } from '@angular/core';
import { FilterData } from '../models/filter-data';
import { WeatherCheckerService } from '../weather-checker.service';

@Component({
  selector: 'wa-slider-filter',
  templateUrl: './slider-filter.component.html',
  styleUrls: ['./slider-filter.component.scss']
})
export class SliderFilterComponent {

  @Input() filters: FilterData[];
  constructor(private checkerService: WeatherCheckerService) { }

  toggleFilter(index) {
    this.checkerService.toggleFilter(index);
  }

}
