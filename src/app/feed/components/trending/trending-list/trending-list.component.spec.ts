import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingListComponent } from './trending-list.component';

describe('TrendingListComponent', () => {
  let component: TrendingListComponent;
  let fixture: ComponentFixture<TrendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
