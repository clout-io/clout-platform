import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  private category: string;
  public categories;
  public disabled = true;

  @ViewChild('inputContainer') inputContainer: ElementRef;
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

    this.feedService.getCategories().take(1)
      .subscribe(res => this.categories = res);

    this.fixIOSDocumentClickBug();
  }

  onKey() {
    this.checkBtnDisabling();
  }

  checkBtnDisabling(): void {
    const textEl = this.feedTextDivEl.nativeElement;
    const text = (textEl.textContent || textEl.innerText).trim();

    this.disabled = !((!!text.trim().length || !!this.linkData || !!this.loadImgId) && !!this.category);
  }

  fixIOSDocumentClickBug() {
    const iOS = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    if (iOS) {
      document.body.style.cursor = 'pointer';
    }
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement || !this.hasPublish) { return; }

    const contains = this.inputContainer.nativeElement.contains(targetElement);
    if (!contains) { this.blurText(); }
  }

  chooseCategory(category: string) {
    this.category = category;
    this.checkBtnDisabling();
  }

  onPaste(data) {
    let pastedValue = '';
    if (!data.clipboardData) { // IE11
      pastedValue = window['clipboardData'].getData('text');
    } else {
      pastedValue = data.clipboardData.getData('text/plain');
    }
    const regx = /(\b(((https?|ftp):\/\/)|www.)[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    if (pastedValue.search(regx) !== -1) {
      this.feedService.urlInfo(pastedValue)
        .subscribe(res => {
          const txt = this.feedTextDivEl.nativeElement.innerText.replace(pastedValue, ' ' + pastedValue);
          this.feedTextDivEl.nativeElement.innerText = txt;
          this.linkData = res.data;
        });
    }
  }

  feedCreate() {
    const textEl = this.feedTextDivEl.nativeElement;
    let text = (textEl.textContent || textEl.innerText).trim();
    text = text.replace(/\s+/g, ' '); //delete all spaces

    if (!!this.linkData) {
      const params = {
        text: text === this.placeHolder ? '' : text,
        link: this.linkData.ogUrl,
        category: this.category
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
      const params = {
        text: text === this.placeHolder ? '' : text
      };

      if (this.loadImgId)
        params['attachment'] = [this.loadImgId];

      params['category'] = this.category;

      this.feedService.feedCreate(params)
        .subscribe(responce => {
          this.feedTextDivEl.nativeElement.innerHTML = this.placeHolder;
          this.imageSrc = null;
          this.file = null;
          this.hasPublish = false;
          this.loadImgId = null;
          this.broadcastService.broadcast('updateNewsList', responce);
        });
    }
  }

  triggerToInput($event) {
    $event.preventDefault();
    $event.stopPropagation();
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
        this.checkBtnDisabling();
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
    this.setContentEditable(true);
    const textEl = this.feedTextDivEl.nativeElement;
    textEl.focus();
    setTimeout(() => {
      const text = textEl.textContent || textEl.innerText;
      if (text.trim() === this.placeHolder) {
        textEl.innerHTML = '';
        this.hasPublish = true;
      }
    }, 0);
  }

  blurText() {
    setTimeout(() => {
      const textEl = this.feedTextDivEl.nativeElement;
      const text = textEl.textContent || textEl.innerText;
      if (!text.trim().length) {
        textEl.innerHTML = this.placeHolder;
        this.hasPublish = false;
        this.setContentEditable(false);
      }
    }, 0);
  }

  setContentEditable(flag: boolean) {
    this.feedTextDivEl.nativeElement.setAttribute('contenteditable', flag);
  }
}
