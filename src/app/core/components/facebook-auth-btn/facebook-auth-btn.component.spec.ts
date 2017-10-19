import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAuthBtnComponent } from './facebook-auth-btn.component';

describe('FacebookAuthBtnComponent', () => {
  let component: FacebookAuthBtnComponent;
  let fixture: ComponentFixture<FacebookAuthBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAuthBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAuthBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
