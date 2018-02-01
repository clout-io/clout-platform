import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTabComponent } from './project-tab.component';

describe('ProjectTabComponent', () => {
  let component: ProjectTabComponent;
  let fixture: ComponentFixture<ProjectTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
