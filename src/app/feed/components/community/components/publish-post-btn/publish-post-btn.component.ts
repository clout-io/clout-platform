import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-publish-post-btn',
  templateUrl: './publish-post-btn.component.html',
  styleUrls: ['./publish-post-btn.component.scss']
})
export class PublishPostBtnComponent implements OnInit {
  @Input() hasPublish;
  @Input() disabled;
  @Output() onPublish = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  publish() {
    if (!this.hasPublish) { return; }
    this.onPublish.emit();
  }
}
