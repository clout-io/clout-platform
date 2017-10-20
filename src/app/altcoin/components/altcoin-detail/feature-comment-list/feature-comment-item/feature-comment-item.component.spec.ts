import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCommentItemComponent } from './feature-comment-item.component';

describe('FeatureCommentItemComponent', () => {
  let component: FeatureCommentItemComponent;
  let fixture: ComponentFixture<FeatureCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
