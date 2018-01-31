import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTabComponent } from './team-tab.component';

describe('TeamTabComponent', () => {
  let component: TeamTabComponent;
  let fixture: ComponentFixture<TeamTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
