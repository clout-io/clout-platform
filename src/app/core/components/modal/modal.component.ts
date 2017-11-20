import {Component, Input, OnInit} from '@angular/core';
import { ModalService } from '../../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() blocking = false;
  @Input() enableOutsideClickClose = false;
  isOpen = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  onClickWindow($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const outsideClicked = $event.target['classList'].contains('modal');
    if (outsideClicked && this.enableOutsideClickClose) {
      this.modalService.close(this.modalId, true);
    }
  }
}
