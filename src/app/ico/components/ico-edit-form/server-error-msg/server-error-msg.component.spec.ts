import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorMsgComponent } from './server-error-msg.component';

describe('ServerErrorMsgComponent', () => {
  let component: ServerErrorMsgComponent;
  let fixture: ComponentFixture<ServerErrorMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
