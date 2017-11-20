import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeadComponent } from './post-head.component';

describe('PostHeadComponent', () => {
  let component: PostHeadComponent;
  let fixture: ComponentFixture<PostHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
