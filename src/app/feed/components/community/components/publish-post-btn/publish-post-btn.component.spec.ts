import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostBtnComponent } from './publish-post-btn.component';

describe('PublishPostBtnComponent', () => {
  let component: PublishPostBtnComponent;
  let fixture: ComponentFixture<PublishPostBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishPostBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPostBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
