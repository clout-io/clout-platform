import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCreateComponent } from './feed-create.component';

describe('FeedListComponent', () => {
  let component: FeedCreateComponent;
  let fixture: ComponentFixture<FeedCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
