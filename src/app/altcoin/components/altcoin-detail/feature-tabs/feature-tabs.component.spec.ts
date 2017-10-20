import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTabsComponent } from './feature-tabs.component';

describe('FeatureTabsComponent', () => {
  let component: FeatureTabsComponent;
  let fixture: ComponentFixture<FeatureTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
