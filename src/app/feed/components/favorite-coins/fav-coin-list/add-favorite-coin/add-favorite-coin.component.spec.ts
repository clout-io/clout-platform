import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteCoinComponent } from './add-favorite-coin.component';

describe('AddFavoriteCoinComponent', () => {
  let component: AddFavoriteCoinComponent;
  let fixture: ComponentFixture<AddFavoriteCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFavoriteCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoriteCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
