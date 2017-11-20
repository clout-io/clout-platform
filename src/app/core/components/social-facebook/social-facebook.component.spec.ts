import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFacebookComponent } from './social-facebook.component';

describe('SocialFacebookComponent', () => {
  let component: SocialFacebookComponent;
  let fixture: ComponentFixture<SocialFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
