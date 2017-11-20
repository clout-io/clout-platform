import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinListComponent } from './altcoin-list.component';

describe('AltcoinListComponent', () => {
  let component: AltcoinListComponent;
  let fixture: ComponentFixture<AltcoinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
