import { Component, OnInit, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { FeedService } from '../../../services/feed';

@Component({
  selector: 'app-ico-edit-form',
  templateUrl: './ico-edit-form.component.html',
  styleUrls: ['./ico-edit-form.component.scss']
})
export class IcoEditFormComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @ViewChild('uploadIcoLogo') uploadIcoLogo: ElementRef;
  imageSrc: string;

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    containerClasses: 'custom-multiple-select',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select services',
    allSelected: 'All selected',
  };

  constructor(private renderer: Renderer,
              private feedService: FeedService) {}

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: 'Service 1' },
      { id: 2, name: 'Service 2' },
      { id: 3, name: 'Service 3' },
      { id: 4, name: 'Service 4' },
      { id: 5, name: 'Service 5' },
      { id: 6, name: 'Service 6' },
      { id: 7, name: 'Service 7' },
      { id: 8, name: 'Service 7' },
      { id: 9, name: 'Service 7' },
      { id: 10, name: 'Service 7' },
      { id: 11, name: 'Service 7' },
      { id: 12, name: 'Service 7' },
      { id: 13, name: 'Service 7' },
      { id: 14, name: 'Service 7' },
      { id: 15, name: 'Service 7' },
      { id: 16, name: 'Service 7' },
      { id: 17, name: 'Service 7' }
    ];
  }

  cancel() {
    this.onCancel.emit();
  }

  save() {
    this.onSave.emit();
  }

  onChange() {
    console.log(this.optionsModel);
  }

  triggerToInput() {
    const event = new MouseEvent('click');
    this.renderer.invokeElementMethod(
      this.uploadIcoLogo.nativeElement, 'dispatchEvent', [event]);
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
    console.log(file);

    this.feedService.loadImage(formData)
      .subscribe(responce => {
        const imageSrc = window.URL.createObjectURL(file);
        this.imageSrc = imageSrc;
        //this.onUploadPhoto.emit({file, imageSrc, loadImgId: responce[0].id});
      }, (error) => {
    });

    /*this.feedService.loadImage(formData)
      .subscribe(responce => {
        const imageSrc = window.URL.createObjectURL(file);
        this.onUploadPhoto.emit({file, imageSrc, loadImgId: responce[0].id});
      }, (error) => {
      });*/
  }

}
