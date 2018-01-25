import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// modules
import { CoreModule } from '../core/core.module';
import { IcoRoutingModule } from './ico-routing.module';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
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
  TeamMembersComponent,
  // search
  SearchComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    IcoRoutingModule,
    MultiselectDropdownModule,
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
    TeamMembersComponent
  ]
})
export class IcoModule { }
