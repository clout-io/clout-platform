import { Component, OnInit } from '@angular/core';
import { BroadcastService, ModalService } from '../../services';

@Component({
  selector: 'app-shell',
  templateUrl: 'shell.component.html',
  styleUrls: ['shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private broadcastService: BroadcastService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.broadcastService.subscribe('showPopup', (popupName) => {
      this.modalService.open(popupName);
    });
  }

}
