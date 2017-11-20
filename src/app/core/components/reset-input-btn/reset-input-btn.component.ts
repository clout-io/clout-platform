import { Component, OnInit, Input } from '@angular/core';
import { BroadcastService } from '../../../services/broadcastService';

@Component({
  selector: 'app-reset-input-btn',
  templateUrl: './reset-input.component.html',
  styleUrls: ['./reset-input.component.scss']
})
export class ResetInputBtnComponent implements OnInit {
  @Input() inputName: string;
  @Input() inputField: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
  }

  reset() {
    if (this.inputField) {
      this.inputField.reset();
    }
    this.broadcastService.broadcast('resetInput', this.inputName);
  }

}
