import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCommentListComponent } from './feature-comment-list.component';

describe('FeatureCommentListComponent', () => {
  let component: FeatureCommentListComponent;
  let fixture: ComponentFixture<FeatureCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
