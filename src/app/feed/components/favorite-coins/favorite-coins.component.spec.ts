import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCoinsComponent } from './favorite-coins.component';

describe('FavoriteCoinsComponent', () => {
  let component: FavoriteCoinsComponent;
  let fixture: ComponentFixture<FavoriteCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
