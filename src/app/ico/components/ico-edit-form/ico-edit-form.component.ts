import {
  Component, OnInit, Output, EventEmitter, Renderer, ViewChild, ElementRef
} from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { FeedService, IcosService } from '../../../services';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { multiSelectEmptyValidator } from '../../../shared';
import { emptyValidator } from '../../../shared';
import {BroadcastService} from '../../../services/broadcastService';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

@Component({
  selector: 'app-ico-edit-form',
  templateUrl: './ico-edit-form.component.html',
  styleUrls: ['./ico-edit-form.component.scss']
})
export class IcoEditFormComponent implements OnInit {
  premiumForm: FormGroup;
  form: FormGroup;
  socials: any;
  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @ViewChild('uploadIcoLogo') uploadIcoLogo: ElementRef;
  @ViewChild('categoryMultiSelect') categoryMultiSelect: ElementRef;
  imageSrc: string;
  scores: Array<any> = [
    {value: 'low', label: 'LOW'},
    {value: 'medium', label: 'MEDIUM'},
    {value: 'hight', label: 'HIGH'},
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
  statuses: Array<any> = [
    {value: 'upcoming', label: 'Upcoming'},
    {value: 'ongoing', label: 'Ongoing'},
    {value: 'closed', label: 'Closed'},
  ];
  years: Array<any> = [
    {value: 2017, label: 2017},
    {value: 2018, label: 2018},
    {value: 2019, label: 2019},
    {value: 2020, label: 2020},
    {value: 2021, label: 2021},
    {value: 2022, label: 2022},
    {value: 2023, label: 2023},
    {value: 2024, label: 2024},
  ];
  projectStages: Array<any>;
  tokenTypes: Array<any>;
  tokenTechnologies: Array<any>;
  industries: Array<any>;
  countries: Array<any>;
  categories: IMultiSelectOption[] = [];

  team = [{
      id: "59f9d19798f3eerere0ad5c5c2f2c",
      name: "Will Warren11",
      role: "Co-founder & CEO",
      action: 1,
      order: 11,
    },
    {
      id: "59f9d1qqwwww9798f3e0ad5c5c2f2c",
      name: "Will Warren5",
      role: "Co-founder & CEO",
      order: 5,
      action: 3,
    },
    {
      id: "59f9d19edsdsd798f3e0ad5c5c2f2c",
      name: "Will Warren8",
      role: "Co-founder & CEO",
      order: 8,
      action: 2,
    }
  ];

  multiSettings: IMultiSelectSettings = {
    enableSearch: true,
    containerClasses: 'custom-multiple-select',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

  multiTexts: IMultiSelectTexts = {
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

  datepickerOptions: FlatpickrOptions = {
    dateFormat: 'm/d/Y',
    mode: 'range',
    plugins: [rangePlugin({ input: '#secondRangeInput' })]
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
      .subscribe(res => {
        this.categories = res.map(item => { return {id: item.id, name: item.name}; });
        setTimeout(() => this.form.controls['categories'].markAsUntouched(), 0);
        this.broadcastService.broadcast('updateCategoryTitle');
      });

    this.icosService.getCountries().take(1)
      .subscribe(res => {
        this.countries = [];
        Object.keys(res).forEach(key => {
          this.countries.push({value: key, label: res[key]});
        });
      });

    this.premiumForm = this.formBuilder.group({
      image: ['', [Validators.required]],
      premiumRank: ['1'],
      isPremium: [false],
      premiumDescription: ['']
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, emptyValidator()]],
      description: ['', [Validators.required, emptyValidator()]],
      hypeScore: [''],
      riskScore: [''],
      investScore: [''],
      projectStage: [''],
      tokenType: [''],
      tokenTechnology: [''],
      industry: [''],
      status: [''],
      founded: [''],
      site: [''],
      whitepaper: [''],
      blog: [''],
      features: [''],
      tokenDistribution: [''],
      tokenSales: [''],
      accepts: [''],
      similarProjects: [''],
      technicalDetails: [''],
      sourceCode: [''],
      proofOfDeveloper: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      primaryGeography: ['', Validators.required],
      jurisdiction: ['', Validators.required],
      amount: ['', [Validators.required, emptyValidator(), Validators.min(1)]],
      categories: ['', [Validators.required, multiSelectEmptyValidator()]],
      socials: this.formBuilder.array([ this.createSocialItem() ])
    });
    this.form.controls['primaryGeography']['isSelectRequired'] = true;
    this.form.controls['jurisdiction']['isSelectRequired'] = true;
    this.socials = this.form.get('socials') as FormArray;
  }

  createSocialItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, emptyValidator()]],
      link: ['', [Validators.required, emptyValidator()]],
      icon: ['']
    });
  }

  filterCategory(filter) {
    const a = document.createElement('p');
    a.innerHTML = `Add '${filter}'`;
    a.addEventListener('click', () => {
      const obj: IMultiSelectOption = {id: 'new_' + filter, name: filter};
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

  addSocialItem() {
    this.socials = this.form.get('socials') as FormArray;
    this.socials.push(this.createSocialItem());
  }

  removeSocialItem(index: number) {
    const toDelete = confirm('Do you really want to delete this item?');
    if (toDelete) { this.socials.removeAt(index); }
  }

  onAdded(a) {
    this.broadcastService.broadcast('updateCategoryTitle');
  }

  onRemoved(a) {
    this.broadcastService.broadcast('updateCategoryTitle');
  }

  onDropdownClosed() {
    this.form.controls['categories'].markAsTouched();
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

  teamChange(team: any[]) {
    console.log('new team', team);
  }

  save() {
    this.form.controls['socials']['controls'].map(item => {
      item['controls']['name'].markAsTouched();
      item['controls']['link'].markAsTouched();
    });
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

  readThis(inputValue: any): void {
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
      }, (error) => {});
  }

}
