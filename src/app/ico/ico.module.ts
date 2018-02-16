import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// modules
import { CoreModule } from '../core/core.module';
import { IcoRoutingModule } from './ico-routing.module';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'angular2-select';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

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
  IcoStatusComponent,
  // ICO detail
  IcoDetailComponent,
  IcoSelectComponent,
  FeatureListComponent,
  // ICO feature tabs
  FeatureTabsComponent,
  ProjectTabComponent,
  IcoTabComponent,
  TechTabComponent,
  TeamTabComponent,
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
  TeamMembersComponent,
  // search
  SearchComponent,
  FooDirective,
  ServerErrorMsgComponent,
  // pricing
  PricingPlanComponent
} from './components';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    IcoRoutingModule,
    MultiselectDropdownModule,
    SelectModule,
    DragulaModule,
    FormsModule,
    ReactiveFormsModule
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
    IcoStatusComponent,
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
    FooDirective,
    TeamMembersComponent,
    ServerErrorMsgComponent,
    ProjectTabComponent,
    IcoTabComponent,
    TechTabComponent,
    TeamTabComponent,
    PricingPlanComponent
  ]
})
export class IcoModule { }
