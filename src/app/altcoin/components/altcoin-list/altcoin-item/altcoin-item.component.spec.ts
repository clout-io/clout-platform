import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinItemComponent } from './altcoin-item.component';

describe('AltcoinItemComponent', () => {
  let component: AltcoinItemComponent;
  let fixture: ComponentFixture<AltcoinItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
