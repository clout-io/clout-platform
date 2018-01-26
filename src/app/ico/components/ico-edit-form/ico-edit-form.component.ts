import { Component, OnInit, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { FeedService, IcosService } from '../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../../../shared';
import {BroadcastService} from "../../../services/broadcastService";

@Component({
  selector: 'app-ico-edit-form',
  templateUrl: './ico-edit-form.component.html',
  styleUrls: ['./ico-edit-form.component.scss']
})
export class IcoEditFormComponent implements OnInit {
  premiumForm: FormGroup;
  form: FormGroup;
  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @ViewChild('uploadIcoLogo') uploadIcoLogo: ElementRef;
  @ViewChild('categoryMultiSelect') categoryMultiSelect: ElementRef;
  @ViewChild('ff') ff: ElementRef;
  imageSrc: string;
  imageLoaded = true;
  defaultMember = {name: '', link: '', icon: {key: 'dot-circle-o', styleClass: 'fa-dot-circle-o'}};
  linksList = [
    {...this.defaultMember}
  ];
  scores: Array<any> = [
    {value: '1', label: 'LOW'},
    {value: '2', label: 'MEDIUM'},
    {value: '3', label: 'HIGH'},
  ];
  premiumRanks: Array<any> = [
    {value: '1', label: 'Level One'},
    {value: '2', label: 'Level Two'},
    {value: '3', label: 'Level Three'},
    {value: '4', label: 'Level Four'},
    {value: '5', label: 'Level Five'},
    {value: '6', label: 'Level Six'},
    {value: '7', label: 'Level Seven'},
    {value: '8', label: 'Level Eight'},
    {value: '9', label: 'Level Nine'},
    {value: '10', label: 'Level Ten'}
  ];
  projectStages: Array<any>;
  tokenTypes: Array<any>;
  tokenTechnologies: Array<any>;
  industries: Array<any>;
  countries: Array<any>;
  categories: IMultiSelectOption[] = [];

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
    defaultTitle: 'Select Category',
    allSelected: 'Select Category',
  };

  constructor(private renderer: Renderer,
              private feedService: FeedService,
              private broadcastService: BroadcastService,
              private icosService: IcosService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.icosService.getFiltersStage().take(1)
      .subscribe(res => this.projectStages = res.map(item => { return {value: item.id, label: item.name}; }));

    this.icosService.getFiltersTokenType().take(1)
      .subscribe(res => this.tokenTypes = res.map(item => { return {value: item.id, label: item.name}; }));

    this.icosService.getFiltersTokenTechnology().take(1)
      .subscribe(res => this.tokenTechnologies = res.map(item => { return {value: item.id, label: item.name}; }));

    this.icosService.getFiltersIndustry().take(1)
      .subscribe(res => this.industries = res.map(item => { return {value: item.id, label: item.name}; }));

    this.icosService.getFiltersCategory().take(1)
      .subscribe(res => this.categories = res.map(item => { return {id: item.id, name: item.name}; }));

    this.icosService.getCountries().take(1)
      .subscribe(res => {
        this.countries = [];
        Object.keys(res).forEach(key => {
          this.countries.push({value: key, label: res[key]});
        });
      });

    this.premiumForm = this.formBuilder.group({
      image: [''],
      premiumRank: ['1'],
      isPremium: [false],
      premiumDescription: ['']
    });

    this.form = this.formBuilder.group({
      icoName: ['', [Validators.required, emptyValidator()]],
      description: ['', [Validators.required, emptyValidator()]],
      hypeScore: [''],
      projectStage: [''],
      tokenType: [''],
      tokenTechnology: [''],
      industry: [''],
      primaryGeography: ['', Validators.required],
      jurisdiction: ['', Validators.required],
      amount: ['', Validators.required],
      categories: ['']
    });
    this.form.controls['primaryGeography']['isSelectRequired'] = true;
    this.form.controls['jurisdiction']['isSelectRequired'] = true;

    setTimeout(() => {
      //this.opened();
    }, 2000)
  }

  filterCategory(filter) {
    const a = document.createElement('p');
    a.innerHTML = `Add "${filter}"`;
    a.addEventListener('click', () => {
      const obj: IMultiSelectOption = {id: filter, name: filter};
      this.categories = [].concat(this.categories, [obj]);
      this.broadcastService.broadcast('addCategoryToSelect', obj);
    });
    setTimeout(() => {
      const emptyElement = this.categoryMultiSelect.nativeElement.querySelector('.empty');
      if (emptyElement) {
        emptyElement.innerHTML = '';
        emptyElement.append(a);
      }
    }, 10);
  }

  closeSelect(formControlName: string) {
    this.form.controls[formControlName]['selectWasOpened'] = true;
  }

  addNewTeamMember() {
    this.linksList.push({...this.defaultMember});
  }

  removeTeamMember(index: number) {
    this.linksList.splice(index, 1);
  }

  onAdded(a) {
    this.broadcastService.broadcast('updateCategoryTitle');
  }

  onRemoved(a) {
    this.broadcastService.broadcast('updateCategoryTitle');
  }

  cancel() {
    for (const inputName in this.form.controls) {
      if (this.form.controls[inputName]['isSelectRequired']) {
        this.form.controls[inputName]['selectWasOpened'] = true;
      }
      this.form.get(inputName).markAsTouched();
    }

    this.onCancel.emit();
  }

  save() {
    const premiumC = this.form.controls;
    const icoC = this.form.controls;
    this.onSave.emit();
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

    this.feedService.loadImage(formData)
      .subscribe(responce => {
        const imageSrc = window.URL.createObjectURL(file);
        this.imageSrc = imageSrc;
        this.premiumForm.get('image').setValue(responce[0].id);
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
