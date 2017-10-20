import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { AltcoinRoutingModule } from './altcoin-routing.module';
import { AltcoinComponent } from './altcoin.component';
import {
  AltcoinListComponent,
  AltcoinDetailComponent,
  FeatureDetailComponent,
  FeatureTabsComponent,
  FeatureCommentListComponent,
  FeatureCommentItemComponent,
  AltcoinItemComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    AltcoinRoutingModule
  ],
  declarations: [
    AltcoinComponent,
    AltcoinListComponent,
    AltcoinDetailComponent,
    FeatureDetailComponent,
    FeatureTabsComponent,
    FeatureCommentListComponent,
    FeatureCommentItemComponent,
    AltcoinItemComponent
  ]
})
export class AltcoinModule { }
