import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() feed;
  @Input() file: File;
  @Input() imageSrc: string;
  @Input() imageOldSrc: string;
  @Input() editable: boolean;

  @Output() onUpload = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('init');
  }

}
