import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-save-cancel',
  templateUrl: './save-cancel.component.html',
  styleUrls: ['./save-cancel.component.scss']
})
export class SaveCancelComponent implements OnInit {
  @Output() onSaveCancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.onSaveCancel.emit(true);
  }

  cancel() {
    this.onSaveCancel.emit(false);
  }
}
