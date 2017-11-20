import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { FeedComponent } from './feed.component';
import {
  NewsComponent,
  CommunityComponent,
  PostFilterComponent
} from './components';

const routes: Routes = CoreRoute.withShell([
  {
    path: '',
    redirectTo: '/home/news',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: FeedComponent,
    data: { title: 'News' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'news'
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'community',
        component: CommunityComponent
      },
      {
        path: 'community/hashtag/:tag',
        component: PostFilterComponent
      },
      {
        path: 'community/category/:category',
        component: PostFilterComponent
      }
    ]
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
