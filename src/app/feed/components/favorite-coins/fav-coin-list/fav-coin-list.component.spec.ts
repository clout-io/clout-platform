import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCoinListComponent } from './fav-coin-list.component';

describe('FavCoinListComponent', () => {
  let component: FavCoinListComponent;
  let fixture: ComponentFixture<FavCoinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavCoinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
