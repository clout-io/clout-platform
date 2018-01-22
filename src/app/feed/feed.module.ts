import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { CoreModule } from '../core/core.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { CeiboShare } from 'ng2-social-share';

import { NouisliderModule } from 'ng2-nouislider';

import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';


import {
  FeedListComponent,
  FeedItemComponent,
  FeedCreateComponent,
  NewsComponent,
  NewsListComponent,
  NewsListItemComponent,
  CommunityComponent,
  FavoriteCoinsComponent,
  FavCoinListComponent,
  AddFavoriteCoinComponent,
  FavCoinItemComponent,
  CloutDescSidebarComponent,
  PopularSearchSidebarComponent,
  AdsBlockSidebarComponent,
  PostHeadComponent,
  AttachmentPostComponent,
  SinglePostComponent,
  SaveCancelComponent,
  PostCategoriesComponent,
  PostFilterComponent,
  TrendingComponent,
  TrendingListComponent,
  TrendingItemComponent,
  TinyEditorComponent,
  AddArticleComponent,
  PublishPostBtnComponent,
  EditArticleComponent,
  SinglePostItemComponent,
  FilterSidebarComponent
} from './components';

import { TruncatePipe } from '../pipes';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    InfiniteScrollModule,
    FeedRoutingModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NouisliderModule
  ],
  declarations: [
    CeiboShare,
    FeedComponent,
    FeedListComponent,
    FeedItemComponent,
    FeedCreateComponent,
    NewsComponent,
    NewsListComponent,
    NewsListItemComponent,
    CommunityComponent,
    TruncatePipe,
    FavoriteCoinsComponent,
    FavCoinListComponent,
    AddFavoriteCoinComponent,
    FavCoinItemComponent,
    CloutDescSidebarComponent,
    PopularSearchSidebarComponent,
    AdsBlockSidebarComponent,
    PostHeadComponent,
    AttachmentPostComponent,
    SinglePostComponent,
    SaveCancelComponent,
    PostCategoriesComponent,
    PostFilterComponent,
    TrendingComponent,
    TrendingListComponent,
    TrendingItemComponent,
    TinyEditorComponent,
    AddArticleComponent,
    PublishPostBtnComponent,
    EditArticleComponent,
    SinglePostItemComponent,
    FilterSidebarComponent,
    Ng2FlatpickrComponent
  ]
})
export class FeedModule { }
