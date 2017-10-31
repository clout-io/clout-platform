import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTabComponent } from './chart-tab.component';

describe('ChartTabComponent', () => {
  let component: ChartTabComponent;
  let fixture: ComponentFixture<ChartTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
