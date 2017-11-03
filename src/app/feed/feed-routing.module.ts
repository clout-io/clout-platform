import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { FeedComponent } from './feed.component';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: FeedComponent,  data: { title: 'News' } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
