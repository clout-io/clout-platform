import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FeedService, BroadcastService } from '../../../../../services';


@Component({
  selector: 'app-feed-create',
  templateUrl: 'feed-create.component.html'
})
export class FeedCreateComponent implements OnInit, OnDestroy {

  public feedText: string = '';
  public imageSrc;
  public placeHolder = 'Write something...';
  public hasPublish: boolean = false;
  public formData: FormData = new FormData();
  public loadImgId: string;
  public linkData = null;

  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @ViewChild('feedtext') feedTextDivEl: ElementRef;

  private file: any;

  constructor(
    private feedService: FeedService,
    private renderer: Renderer,
    private broadcastService: BroadcastService)
  { }

  ngOnInit() {
    this.feedText = this.placeHolder;
  }

  onGetLinkData(responce) {
    this.linkData = responce.data;
  }

  feedCreate() {
    if (!!this.linkData) {
      const params = {
        text: this.linkData.ogDescription,
        link: this.linkData.ogUrl,
        category: 'opinion'
      };
      if (this.loadImgId) { params['attachment'] = [this.loadImgId]; }

      this.feedService.feedCreate(params)
        .subscribe(data => {
          this.linkData = null;
          this.feedTextDivEl.nativeElement.innerHTML = this.placeHolder;
          this.imageSrc = null;
          this.file = null;
          this.hasPublish = false;
          this.loadImgId = null;
          this.broadcastService.broadcast('updateNewsList', data);
        });
    } else {
      if (!this.feedTextDivEl.nativeElement.innerHTML)
        return false;

      let params = {
        text: this.feedTextDivEl.nativeElement.innerHTML == this.placeHolder ? '' : this.feedTextDivEl.nativeElement.innerHTML
      };

      if (this.loadImgId)
        params['attachment'] = [this.loadImgId];

      params['category'] = 'opinion';

      this.feedService.feedCreate(params)
        .subscribe(responce => {
          this.feedTextDivEl.nativeElement.innerHTML = this.placeHolder;
          this.imageSrc = null;
          this.file = null;
          this.hasPublish = false;
          this.loadImgId = null;
        });
    }
  }

  triggerToInput() {
    let event = new MouseEvent('click');
    this.renderer.invokeElementMethod(
      this.uploadPicture.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage() {
    this.imageSrc = null;
    this.file = null;
    this.linkData = null;
    this.loadImgId = null;

    if (this.feedTextDivEl.nativeElement.innerHTML === this.placeHolder) {
      this.hasPublish = false;
    }
  }

  ngOnDestroy(): void {
    this.imageSrc = null;
    this.file = null;
  }

  handleUpload($event): void {
    this.readThis($event.target);
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

  focusText() {
    setTimeout(() => {
      if (this.feedTextDivEl.nativeElement.innerHTML === this.placeHolder) {
        this.feedTextDivEl.nativeElement.innerHTML = '';
        this.hasPublish = true;
      }
    }, 0);
  }

  blurText() {
    setTimeout(() => {
      if (this.feedTextDivEl.nativeElement.innerHTML === '') {
        this.feedTextDivEl.nativeElement.innerHTML = this.placeHolder;
        this.hasPublish = false;
      }
    }, 0);
  }
}
