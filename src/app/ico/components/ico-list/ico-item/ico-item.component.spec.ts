import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoItemComponent } from './ico-item.component';

describe('IcoItemComponent', () => {
  let component: IcoItemComponent;
  let fixture: ComponentFixture<IcoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
