import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import { FeedService } from '../services';

@Directive({
  selector: '[appAutomaticGetDataByUrl]'
})
export class AutomaticGetDataByUrlDirective {
  @Output() onSendLinkData = new EventEmitter();

  @Input('selecta') option: any;

  constructor(
    private el: ElementRef,
    private feedService: FeedService
  ) {}

  @HostListener('keyup', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    const charCode = String.fromCharCode(event.which).toLowerCase();

    if (event.ctrlKey && charCode === 'v') {
      this.feedService.urlInfo(this.el.nativeElement.innerText)
        .subscribe(data => {
          this.onSendLinkData.emit(data);
        });

    }
  }

}
