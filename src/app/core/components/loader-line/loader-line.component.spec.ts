import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderLineComponent } from './loader-line.component';

describe('LoaderLineComponent', () => {
  let component: LoaderLineComponent;
  let fixture: ComponentFixture<LoaderLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
