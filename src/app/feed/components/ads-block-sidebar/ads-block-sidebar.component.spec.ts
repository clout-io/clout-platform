import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsBlockSidebarComponent } from './ads-block-sidebar.component';

describe('AdsBlockSidebarComponent', () => {
  let component: AdsBlockSidebarComponent;
  let fixture: ComponentFixture<AdsBlockSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsBlockSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsBlockSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
