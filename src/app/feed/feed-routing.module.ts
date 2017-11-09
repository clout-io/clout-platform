import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { FeedComponent } from './feed.component';
import { NewsComponent, CommunityComponent } from './components'

const routes: Routes = CoreRoute.withShell([
  {
    path: 'feed',
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
      }
    ]
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
