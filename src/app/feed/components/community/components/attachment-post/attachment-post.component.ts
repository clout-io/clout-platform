import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef,
  SimpleChanges
} from '@angular/core';

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

  constructor() { }

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
      this.onDoAction.emit({key: 'cancel', payload: null});
      return;
    }

    const text = !!this.linkData && this.linkData.show ? this.linkData.ogDescription
      : this.textInput.nativeElement.innerText;
    const attachment = !!this.loadImgId ? [this.loadImgId] : [];
    const linkData = !!this.linkData && this.linkData.show ? this.linkData : null;
    this.onDoAction.emit({key: 'save', payload: {flag, text, linkData, attachment}});
  }

  onGetLinkData(res) {
    this.linkData = Object.assign({}, res.data, {show: true});
    this.text = res.data.ogDescription;
    this.isLinkData = true;
  }

  hideAttachedData() {
    this.linkData.show = false;
    this.onDoAction.emit({key: 'showLinkData', payload: false});
  }

  removeImage() {
    this.onDoAction.emit({key: 'removeImage', payload: null});
  }

}
