import { Component, OnInit, NgModule, Input } from '@angular/core';

@Component({
  selector: 'wa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() filterData: Object;
  constructor() { }

  ngOnInit() {
    console.log(this.filterData);
  }

}
