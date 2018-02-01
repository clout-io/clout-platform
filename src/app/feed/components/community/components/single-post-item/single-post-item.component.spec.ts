import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostItemComponent } from './single-post-item.component';

describe('SinglePostItemComponent', () => {
  let component: SinglePostItemComponent;
  let fixture: ComponentFixture<SinglePostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
