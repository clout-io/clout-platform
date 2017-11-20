import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloutDescSidebarComponent } from './clout-desc-sidebar.component';

describe('CloutDescSidebarComponent', () => {
  let component: CloutDescSidebarComponent;
  let fixture: ComponentFixture<CloutDescSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloutDescSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloutDescSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
