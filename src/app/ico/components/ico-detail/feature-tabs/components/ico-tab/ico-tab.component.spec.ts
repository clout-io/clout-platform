import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoTabComponent } from './ico-tab.component';

describe('IcoTabComponent', () => {
  let component: IcoTabComponent;
  let fixture: ComponentFixture<IcoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
