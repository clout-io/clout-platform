import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// modules
import { CoreModule } from '../core/core.module';
import { IcoRoutingModule } from './ico-routing.module';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'angular2-select';

// components
import { IcoComponent } from './ico.component';
import {
  // filters
  FiltersComponent,
  CalendarComponent,
  CheckboxComponent,
  RangeComponent,
  // ICO container
  IcoContentComponent,
  // ICO detail
  IcoDetailComponent,
  IcoSelectComponent,
  FeatureListComponent,
  FeatureTabsComponent,
  LinksComponent,
  SocialNetworksComponent,
  // ICO list
  IcoListComponent,
  IcoItemComponent,
  // ADD/EDIT Ico
  AddIcoComponent,
  EditIcoComponent,
  IcoEditFormComponent,
  SelectIconComponent,
  // search
  SearchComponent,
  FooDirective
} from './components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    IcoRoutingModule,
    MultiselectDropdownModule,
    SelectModule
  ],
  declarations: [
    IcoComponent,
    // filters
    FiltersComponent,
    CalendarComponent,
    CheckboxComponent,
    RangeComponent,
    // ICO container
    IcoContentComponent,
    // ICO detail
    IcoDetailComponent,
    IcoSelectComponent,
    FeatureListComponent,
    FeatureTabsComponent,
    LinksComponent,
    SocialNetworksComponent,
    // ICO list
    IcoListComponent,
    IcoItemComponent,
    // search
    SearchComponent,
    AddIcoComponent,
    EditIcoComponent,
    IcoEditFormComponent,
    SelectIconComponent,
    FooDirective
  ]
})
export class IcoModule { }
