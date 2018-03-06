import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WeatherCheckerService } from '../weather-checker.service';

@Component({
  selector: 'wa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SliderComponent {
  @Input() filterData: Object;
  constructor(private checkerService: WeatherCheckerService) {}

  valueChange(label, value) {
    this.checkerService.setFilterValue(label, value);
  }

  toleranceChange(label, tolerance) {
    this.checkerService.setFilterTolerance(label, tolerance);
  }
}
