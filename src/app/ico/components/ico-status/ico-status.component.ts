import { Component, OnInit,  OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-ico-status',
  templateUrl: './ico-status.component.html',
  styleUrls: ['./ico-status.component.scss']
})
export class IcoStatusComponent implements OnInit, OnDestroy {
  private empty: boolean = false;

  constructor() {}

  ngOnInit():void {}

  ngOnDestroy(): void {}

  onIsEmpty(isEmpty) {
    this.empty = isEmpty;
  }
}
