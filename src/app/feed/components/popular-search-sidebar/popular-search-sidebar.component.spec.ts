import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSearchSidebarComponent } from './popular-search-sidebar.component';

describe('PopularSearchSidebarComponent', () => {
  let component: PopularSearchSidebarComponent;
  let fixture: ComponentFixture<PopularSearchSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularSearchSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularSearchSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
