import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTabComponent } from './tech-tab.component';

describe('TechTabComponent', () => {
  let component: TechTabComponent;
  let fixture: ComponentFixture<TechTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
