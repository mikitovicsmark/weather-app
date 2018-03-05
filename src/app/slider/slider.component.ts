import { Component, Input } from '@angular/core';
import { WeatherCheckerService } from '../weather-checker.service';

@Component({
  selector: 'wa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() filterData: Object;
  constructor(private checkerService: WeatherCheckerService) { }

  valueChange(label, value) {
    this.checkerService.setFilterValue(label, value);
  }

}
