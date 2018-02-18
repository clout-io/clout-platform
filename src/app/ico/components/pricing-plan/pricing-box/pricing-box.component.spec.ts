import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingBoxComponent } from './pricing-box.component';

describe('PricingBoxComponent', () => {
  let component: PricingBoxComponent;
  let fixture: ComponentFixture<PricingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
