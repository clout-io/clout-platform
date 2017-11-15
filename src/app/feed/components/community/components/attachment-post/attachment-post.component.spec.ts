import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentPostComponent } from './attachment-post.component';

describe('AttachmentPostComponent', () => {
  let component: AttachmentPostComponent;
  let fixture: ComponentFixture<AttachmentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
