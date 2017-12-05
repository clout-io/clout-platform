import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../../../../../../services';
import * as moment from 'moment';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(meta: Meta, title: Title, private feedService: FeedService) {

    title.setTitle('My Spiffy Home Page');

    meta.addTags([
      {'og:image': 'http://example.com/default-image.png'},
      {'og:title': 'title lol'},
      {'og:description': 'description lol'},
    ]);

  }

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
