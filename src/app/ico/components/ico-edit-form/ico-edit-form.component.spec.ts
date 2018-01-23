import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoEditFormComponent } from './ico-edit-form.component';

describe('IcoEditFormComponent', () => {
  let component: IcoEditFormComponent;
  let fixture: ComponentFixture<IcoEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
