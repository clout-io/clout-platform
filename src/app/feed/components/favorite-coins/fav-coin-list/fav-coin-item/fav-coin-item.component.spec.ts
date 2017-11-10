import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCoinItemComponent } from './fav-coin-item.component';

describe('FavCoinItemComponent', () => {
  let component: FavCoinItemComponent;
  let fixture: ComponentFixture<FavCoinItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavCoinItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCoinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
