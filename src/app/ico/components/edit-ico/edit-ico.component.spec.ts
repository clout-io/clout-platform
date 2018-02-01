import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIcoComponent } from './edit-ico.component';

describe('EditIcoComponent', () => {
  let component: EditIcoComponent;
  let fixture: ComponentFixture<EditIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
