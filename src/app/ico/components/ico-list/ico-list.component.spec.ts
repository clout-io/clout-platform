import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoListComponent } from './ico-list.component';

describe('IcoListComponent', () => {
  let component: IcoListComponent;
  let fixture: ComponentFixture<IcoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
