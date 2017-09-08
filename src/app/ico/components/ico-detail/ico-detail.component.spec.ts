import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailComponent } from './ico-detail.component';

describe('IcoDetailComponent', () => {
  let component: IcoDetailComponent;
  let fixture: ComponentFixture<IcoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
