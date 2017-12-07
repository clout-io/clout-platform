import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../../../../../../services';
import { FacebookService } from 'ngx-facebook';
import * as moment from 'moment';

class Action {
  key: string;
  payload: any;
}

@Component({
  selector: 'app-feed-item',
  templateUrl: 'feed-item.component.html'
})
export class FeedItemComponent implements OnInit {
  @Input() feed;
  @Input() categories;
  @Output() onDeletePost = new EventEmitter();
  createDate: string = '';
  editable = false;
  isOwner: boolean;

  public imageSrc: string;
  public loadImgId: string;

  constructor(private feedService: FeedService,
              private fb: FacebookService) {}

  ngOnInit() {
    this.showLinkData(true);
    this.createDate = moment(this.feed.createdAt).fromNow();
    this.isOwner = !!this.feed.owner ? this.getUserId() === this.feed.owner.id : false;
    const type = !!this.feed.type ? this.feed.type : 'post';
    this.feed.type = type;
  }

  private showLinkData(show: boolean) {
    if (!!this.feed.linkData) { this.feed.linkData.show = show; }
  }

  uploadPhoto(data) {
    this.loadImgId = data.loadImgId;
    this.imageSrc = data.imageSrc;
  }

  removeImage() {
    this.imageSrc = null;
    this.loadImgId = null;
  }

  share(): void {
    let title = '';
    let description = this.feed.text;
    let imageUrl = this.feed.attachment.length ?
      'http://haumea.bvblogic.net:8103' + this.feed.attachment[0].url : '';

    if (this.feed.linkData) {
      title = this.feed.linkData.ogTitle;
      description = this.feed.linkData.ogDescription;
      imageUrl = this.feed.linkData.ogImage.url;
    }

    if (this.feed.type === 'article') {
      const regexImgTag = /<img.*?src="(.*?)"/;
      const imgTag = regexImgTag.exec(this.feed.text);
      if (imgTag) {
        imageUrl = imgTag[1];
      }
      description = this.parseTextFromHtml(this.feed.text);
    }

    const defaultUrl = 'https://steemitimages.com/DQmPJPwNz2t9d6ZsoUo1cyvKGfWTE9VZ2kgogyzDYvSSbmq/image.png';
    const ogObj = {
      'og:url': window.location.origin + '/home/community/' + this.feed.id,
      'og:title': title,
      'og:description': description,
      'og:image': !!imageUrl.length ? imageUrl : defaultUrl
    };

    this.fb.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      display: 'popup',
      action_properties: JSON.stringify({
        object: ogObj
      })
    }).catch(() => {});
  }

  parseTextFromHtml(str: string) {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = str;
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
  }

  onDoAction(action: Action) {
    switch (action.key) {
      case 'removeImage': this.removeImage(); break;
      case 'cancel': this.cancel(); break;
      case 'save': this.save(action.payload); break;
      case 'showLinkData': this.showLinkData(action.payload); break;
    }
  }

  editFlag(edit: boolean) {
    this.editable = edit;
  }

  getUserId(): string {
    return window.localStorage.getItem('clout_user_id');
  }

  edit() {
    this.editFlag(this.getUserId() === this.feed.owner.id);
    if (this.feed.attachment.length) {
      this.imageSrc = this.feed.attachment[0].url;
      this.loadImgId = this.feed.attachment[0].id;
    }
  }

  delete() {
    if (!(this.getUserId() === this.feed.owner.id)) { return; }

    const {id} = this.feed;
    this.feedService.deleteFeed(id)
      .subscribe(data => {
        if (data !== 404 && data !== 400) {
          this.onDeletePost.emit(id);
        }
      });
  }

  cancel() {
    this.removeImage();
    this.showLinkData(true);
    this.editFlag(false);
  }

  save(params) {
    this.feedService.editFeed(this.feed.id, params)
      .subscribe(responce => {
        const {text, link, linkData, attachment, category} = responce;
        this.feed.text = text;
        this.feed.link = link;
        this.feed.linkData = linkData;
        this.feed.category = category;
        this.feed.attachment = attachment;
        this.cancel();
      }, error => this.cancel());
  }
}
