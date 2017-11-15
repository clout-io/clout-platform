import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef,
  SimpleChanges
} from '@angular/core';

import { FeedService } from '../../../../../services';

@Component({
  selector: 'app-attachment-post',
  templateUrl: './attachment-post.component.html',
  styleUrls: ['./attachment-post.component.scss']
})
export class AttachmentPostComponent implements OnInit, OnChanges {
  @Input() feed;
  @Input() imageSrc: string;
  @Input() loadImgId: string;
  @Input() editable: boolean;
  @Input() text: string;
  @ViewChild('text_input') textInput: ElementRef;
  @Output() onDoAction = new EventEmitter();
  public linkData = null;
  public isLinkData = false;
  private pastedValue: string;

  constructor(private feedService: FeedService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isImageSrc = !!changes['imageSrc'] && !!changes['imageSrc']['currentValue'];
    if (!isImageSrc) {
      this.isLinkData = !!this.feed.linkData;
      this.linkData = this.isLinkData ? {...this.feed.linkData} : null;
    }
  }

  saveOrCancel(flag: boolean) {
    if (!flag) {
      this.text = this.feed.text;
      this.onDoAction.emit({key: 'cancel', payload: null});
      return;
    }

    const text = this.textInput.nativeElement.innerText;
    const attachment = !!this.loadImgId ? [this.loadImgId] : [];
    const linkData = !!this.linkData && this.linkData.show ? this.linkData : null;
    this.onDoAction.emit({key: 'save', payload: {flag, text, linkData, attachment}});
  }

  onPaste(data) {
    let pastedValue = '';
    if (!data.clipboardData) { // IE11
      pastedValue = window['clipboardData'].getData('text');
    } else {
      pastedValue = data.clipboardData.getData('text/plain');
    }
    this.pastedValue = pastedValue;
    const regx = /(\b(((https?|ftp):\/\/)|www.)[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    if (this.pastedValue.search(regx) !== -1) {
      this.feedService.urlInfo(pastedValue)
        .subscribe(res => {
          const txt = this.textInput.nativeElement.innerText.replace(this.pastedValue, ' ' + this.pastedValue);
          this.textInput.nativeElement.innerText = txt;
          this.text = txt;
          this.linkData = Object.assign({}, res.data, {show: true});
          this.isLinkData = true;
        });
    }
  }

  hideAttachedData() {
    this.linkData.show = false;
    this.onDoAction.emit({key: 'showLinkData', payload: false});
  }

  removeImage() {
    this.onDoAction.emit({key: 'removeImage', payload: null});
  }

}
