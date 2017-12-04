import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoriesComponent } from './post-categories.component';

describe('PostCategoriesComponent', () => {
  let component: PostCategoriesComponent;
  let fixture: ComponentFixture<PostCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
