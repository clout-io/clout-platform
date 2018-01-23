import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIcoComponent } from './add-ico.component';

describe('AddIcoComponent', () => {
  let component: AddIcoComponent;
  let fixture: ComponentFixture<AddIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
