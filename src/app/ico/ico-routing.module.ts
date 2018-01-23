import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { IcoComponent } from './ico.component';
import {
  IcoContentComponent,
  EditIcoComponent,
  AddIcoComponent,
  IcoSelectComponent
} from './components';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/icos', pathMatch: 'full' },
  {
    path: 'icos', component: IcoComponent, data: {title: 'ICOs'},
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full'},
      { path: 'all', component: IcoContentComponent, data: {tab: 'all'} },
      { path: 'upcoming', component: IcoContentComponent, data: {tab: 'upcoming'} },
      { path: 'ongoing', component: IcoContentComponent, data: {tab: 'ongoing'} },
      { path: 'closed', component: IcoContentComponent, data: {tab: 'closed'} },
      { path: 'details/:id', component: IcoSelectComponent }
    ]
  },
  { path: 'ico/add', component: AddIcoComponent },
  { path: 'ico/edit', component: EditIcoComponent },
  { path: '**', redirectTo: 'icos'}
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcoRoutingModule { }
