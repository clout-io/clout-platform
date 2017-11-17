import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';

import { FeedService } from '../../../../../services';

@Component({
  selector: 'app-attachment-post',
  templateUrl: './attachment-post.component.html',
  styleUrls: ['./attachment-post.component.scss'],
})
export class AttachmentPostComponent implements OnInit, OnChanges {
  @Input() feed;
  @Input() imageSrc: string;
  @Input() loadImgId: string;
  @Input() editable: boolean;
  @ViewChild('text_input') textInput: ElementRef;
  @Output() onDoAction = new EventEmitter();
  public linkData = null;
  public text: string;
  public isLinkData = false;
  private pastedValue: string;

  constructor(
    private router: Router,
    private feedService: FeedService,
    private elRef: ElementRef) {
  }

  ngOnInit() {
  }

  parseTags() {
    const tags = this.elRef.nativeElement.querySelectorAll('a');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].href.lastIndexOf('hashtagref') !== -1) {
        tags[i].addEventListener('click', this.goByTag.bind(this));
        const tagName = tags[i].innerHTML.trim().slice(1);
        tags[i].setAttribute('href', `/home/community/hashtag/${tagName}`);
      }
    }
  }

  goByTag($event) {
    $event.preventDefault();
    const tagName = $event.target.innerHTML.trim().slice(1);
    this.router.navigateByUrl(`/home/community/hashtag/${tagName}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.text = this.editable ? this.parseTextFromHtml(this.feed.text) : this.parseTagsHref(this.feed.text);
    if (!this.editable) {
      setTimeout(() => this.parseTags(), 0);
    }

    const isImageSrc = !!changes['imageSrc'] && !!changes['imageSrc']['currentValue'];
    if (!isImageSrc) {
      this.isLinkData = !!this.feed.linkData;
      this.linkData = this.isLinkData ? {...this.feed.linkData} : null;
    }
  }

  parseTagsHref(str) {
    if (str) { return str.replace(new RegExp('href=\"javascript:;\"', 'g'), 'href="hashtagref"'); }
    return '';
  }

  parseTextFromHtml(str: string) {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = str;
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
  }

  saveOrCancel(flag: boolean) {
    if (!flag) {
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
          this.text = this.textInput.nativeElement.innerText.replace(this.pastedValue, ' ' + this.pastedValue);
          this.textInput.nativeElement.innerText = this.text;
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
