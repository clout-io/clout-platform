import { Component, OnInit, Input, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FeedService } from '../../../../../services';

@Component({
  selector: 'app-post-head',
  templateUrl: './post-head.component.html',
  styleUrls: ['./post-head.component.scss']
})
export class PostHeadComponent implements OnInit {
  @Input() feed;
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @Output() onUploadPhoto = new EventEmitter();

  constructor(
    private renderer: Renderer,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
  }

  triggerToInput() {
    //if (!this.feed.linkData || !this.feed.linkData.show) {
      const event = new MouseEvent('click');
      this.renderer.invokeElementMethod(
        this.uploadPicture.nativeElement, 'dispatchEvent', [event]);
    //}
  }

  handleUpload($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    const file: File = inputValue.files[0];
    const readerImage: FileReader = new FileReader();
    readerImage.onloadend = event => {
      if (!event.returnValue) {
        return false;
      }
      if (file.size > 10 * 1000000) {
        return false;
      }
      this.loadImagePreview(file);
    };
    readerImage.readAsDataURL(file);
  }

  loadImagePreview(file) {
    if (!file) { return false; }

    const formData: FormData = new FormData();
    formData.append('img', file, file.name);

    this.feedService.loadImage(formData)
      .subscribe(responce => {
        const imageSrc = window.URL.createObjectURL(file);
        this.onUploadPhoto.emit({file, imageSrc, loadImgId: responce[0].id});
      }, (error) => {
      });
  }

}
