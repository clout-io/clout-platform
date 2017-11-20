import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHashtagComponent } from './post-hashtag.component';

describe('PostHashtagComponent', () => {
  let component: PostHashtagComponent;
  let fixture: ComponentFixture<PostHashtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHashtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHashtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
