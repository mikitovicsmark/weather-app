import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFilterComponent } from './slider-filter.component';
import { MatInputModule, MatSlideToggleModule, MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WeatherCheckerService } from '../weather-checker.service';
import { defaultFilterData } from '../default-filter-data';
import { By } from '@angular/platform-browser';

describe('SliderFilterComponent', () => {
  let component: SliderFilterComponent;
  let fixture: ComponentFixture<SliderFilterComponent>;
  const checkerServiceStub: Partial<WeatherCheckerService> = {
    toggleFilter: index => null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatInputModule, MatSlideToggleModule],
      declarations: [SliderFilterComponent],
      providers: [{ provide: WeatherCheckerService, useValue: checkerServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFilterComponent);
    component = fixture.componentInstance;
    component.filters = defaultFilterData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call WeatherCheckerservice toggleFilter on change', () => {
    const fakeService = fixture.debugElement.injector.get(WeatherCheckerService);
    spyOn(fakeService, 'toggleFilter');
    const toggleDe  = fixture.debugElement.queryAll(By.css('mat-slide-toggle'));
    const matToggle = toggleDe[2].componentInstance as MatSlideToggle;

    matToggle.change.emit(new MatSlideToggleChange(matToggle, false));

    expect(fakeService.toggleFilter).toHaveBeenCalledWith(2);
  });
});
