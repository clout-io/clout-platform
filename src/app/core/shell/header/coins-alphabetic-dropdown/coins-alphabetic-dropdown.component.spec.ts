import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsAlphabeticDropdownComponent } from './coins-alphabetic-dropdown.component';

describe('CoinsAlphabeticDropdownComponent', () => {
  let component: CoinsAlphabeticDropdownComponent;
  let fixture: ComponentFixture<CoinsAlphabeticDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsAlphabeticDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsAlphabeticDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
