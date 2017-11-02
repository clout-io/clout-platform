import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    FeedRoutingModule
  ],
  declarations: [FeedComponent]
})
export class FeedModule { }
