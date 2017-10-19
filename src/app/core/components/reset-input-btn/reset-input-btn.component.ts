import { Component, OnInit, Input } from '@angular/core';
import { BroadcastService } from '../../../services/broadcastService';

@Component({
  selector: 'app-reset-input-btn',
  templateUrl: './reset-input.component.html',
  styleUrls: ['./reset-input.component.scss']
})
export class ResetInputBtnComponent implements OnInit {
  @Input() inputName: string;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
  }

  reset() {
    this.broadcastService.broadcast('resetInput', this.inputName);
  }

}
