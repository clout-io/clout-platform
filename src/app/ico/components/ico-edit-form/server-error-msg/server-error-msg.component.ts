import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-error-msg',
  templateUrl: './server-error-msg.component.html',
  styleUrls: ['./server-error-msg.component.scss']
})
export class ServerErrorMsgComponent implements OnInit {
  @Input() control;

  constructor() { }

  ngOnInit() {
  }

}
