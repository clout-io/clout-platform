import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CoreModule } from '../core/core.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import {
  FeedListComponent,
  FeedItemComponent,
  FeedCreateComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    InfiniteScrollModule,
    FeedRoutingModule
  ],
  declarations: [
    FeedComponent,
    FeedListComponent,
    FeedItemComponent,
    FeedCreateComponent
  ]
})
export class FeedModule { }
