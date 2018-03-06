import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSliderModule, MatFormFieldModule, MatSlider, MatSliderChange } from '@angular/material';

import { SliderComponent } from './slider.component';
import { WeatherCheckerService } from '../weather-checker.service';
import { defaultFilterData } from '../default-filter-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  const checkerServiceStub: Partial<WeatherCheckerService> = {
    setFilterTolerance: (label, value) => null,
    setFilterValue: (label, value) => null,
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, MatInputModule, MatSliderModule, MatFormFieldModule, BrowserAnimationsModule],
        declarations: [SliderComponent],
        providers: [{ provide: WeatherCheckerService, useValue: checkerServiceStub }]
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.filterData = defaultFilterData[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call WeatherCheckerservice setFilterValue on value change', () => {
    const fakeService = fixture.debugElement.injector.get(WeatherCheckerService);
    spyOn(fakeService, 'setFilterValue');
    const sliderDe  = fixture.debugElement.query(By.css('mat-slider'));
    const matSlider = sliderDe.componentInstance as MatSlider;

    component.filterData['value'] = 15;
    matSlider.change.emit(new MatSliderChange());

    expect(fakeService.setFilterValue).toHaveBeenCalledWith('Temperature', 15);
  });

  it('should call WeatherCheckerservice setFilterValue on value change', () => {
    const fakeService = fixture.debugElement.injector.get(WeatherCheckerService);
    spyOn(fakeService, 'setFilterTolerance');
    const inputDe  = fixture.debugElement.query(By.css('input'));
    const inputElement = inputDe.nativeElement as HTMLInputElement;

    inputElement.value = '10';
    inputElement.dispatchEvent(new Event('change'));
    expect(fakeService.setFilterTolerance).toHaveBeenCalledWith('Temperature', 10);
  });
});
