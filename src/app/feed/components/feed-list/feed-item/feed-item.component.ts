import { Component, OnInit, Input, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FeedService, BroadcastService } from '../../../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html'
})
export class FeedItemComponent implements OnInit {
  apiUrl = 'http://haumea.bvblogic.net:8103';
  @Input() feed;
  @Output() onDeletePost = new EventEmitter();
  createDate: string = '';
  editable = false;

  public imageSrc;
  public imageOldSrc;
  public hasPublish: boolean = false;
  public loadImgId: string;
  public formData: FormData = new FormData();
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @ViewChild('feedtext') feedTextDivEl: ElementRef;
  private file: any;

  constructor(
    private renderer: Renderer,
    private feedService: FeedService,
    private broadcastService: BroadcastService,
  ) { }

  ngOnInit() {
    this.createDate = moment(this.feed.createdAt).fromNow();
    this.imageOldSrc = this.feed.attachment.length ? this.feed.attachment[0].url : null;
  }

  /**/
  triggerToInput() {
    let event = new MouseEvent('click');
    this.renderer.invokeElementMethod(
      this.uploadPicture.nativeElement, 'dispatchEvent', [event]);
  }

  handleUpload($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    const file:File = inputValue.files[0];
    const readerImage:FileReader = new FileReader();
    readerImage.onloadend = ((event) => {
      if (!event.returnValue) {
        return false;
      }
      if (file.size > 10*1000000) {
        return false;
      }
      this.loadImagePreview(file);
    });
    readerImage.readAsDataURL(file);
  }

  loadImagePreview(file) {
    if (!file)
      return false;

    let formData:FormData = new FormData();
    formData.append('img', file, file.name);

    this.feedService.loadImage(formData)
      .subscribe(responce => {
        this.file = file;
        this.imageSrc = window.URL.createObjectURL(file);
        this.hasPublish = true;
        this.loadImgId = responce[0].id;
      }, (error) => {
        this.imageSrc = null;
        this.file = null;
        this.loadImgId = null;
      });
  }

  removeImage() {
    this.imageSrc = null;
    this.file = null;
    this.loadImgId = null;
    this.hasPublish = false;
    this.imageOldSrc = null;
  }
  /**/

  edit() {
    this.editable = true;
    this.imageOldSrc = this.feed.attachment.length ? this.feed.attachment[0].url : null;
  }

  cancel() {
    this.editable = false;
  }

  save() {
    if (!this.feedTextDivEl.nativeElement.innerText)
      return false;

    let params = {
      text: this.feedTextDivEl.nativeElement.innerText
    };

    if (this.loadImgId) {
      params['attachment'] = [this.loadImgId];
    } else if (!this.imageOldSrc) {
      params['attachment'] = [];
    }

    this.feedService.editFeed(this.feed.id, params)
      .subscribe(data => {
        this.feed.attachment = data.attachment;
        this.feed.text = params.text;
        this.imageSrc = null;
        this.imageOldSrc = null;
        this.file = null;
        this.hasPublish = false;
        this.loadImgId = null;
        this.cancel();
      });
  }
}
