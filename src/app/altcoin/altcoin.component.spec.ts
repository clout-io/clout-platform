import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinComponent } from './altcoin.component';

describe('AltcoinComponent', () => {
  let component: AltcoinComponent;
  let fixture: ComponentFixture<AltcoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
