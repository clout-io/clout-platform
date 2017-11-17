import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../../../../../../services';
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
  @Output() onDeletePost = new EventEmitter();
  createDate: string = '';
  editable = false;
  isOwner: boolean;

  public imageSrc: string;
  public loadImgId: string;

  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.showLinkData(true);
    this.createDate = moment(this.feed.createdAt).fromNow();
    this.isOwner = this.getUserId() === this.feed.owner.id;
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

  save(data) {
    const params = {text: data.text, attachment: data.attachment};
    params['link'] = !!data.linkData ? data.linkData.ogUrl : null;
    params['category'] = 'opinion';
    if (!data.linkData) { params['linkData'] = null; }

    this.feedService.editFeed(this.feed.id, params)
      .subscribe(responce => {
        const {text, link, linkData} = responce;
        this.feed.text = text;
        this.feed.link = link;
        this.feed.linkData = linkData;
        this.feed.attachment = responce.attachment;
        this.cancel();
      }, error => this.cancel());
  }
}
