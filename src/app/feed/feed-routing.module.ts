import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { FeedComponent } from './feed.component';
import { NewsComponent } from './components'

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: FeedComponent,  data: { title: 'News' } },
  { path: 'news/news', component: NewsComponent,  data: { title: 'News' } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
