import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { FeedComponent } from './feed.component';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/feeds', pathMatch: 'full' },
  { path: 'feeds', component: FeedComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
