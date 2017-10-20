import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinDetailComponent } from './altcoin-detail.component';

describe('AltcoinDetailComponent', () => {
  let component: AltcoinDetailComponent;
  let fixture: ComponentFixture<AltcoinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
