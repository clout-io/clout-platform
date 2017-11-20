import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetailComponent } from './feature-detail.component';

describe('FeatureDetailComponent', () => {
  let component: FeatureDetailComponent;
  let fixture: ComponentFixture<FeatureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
