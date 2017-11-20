import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetInputBtnComponent } from './reset-input-btn.component';

describe('ResetInputComponent', () => {
  let component: ResetInputBtnComponent;
  let fixture: ComponentFixture<ResetInputBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetInputBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetInputBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
