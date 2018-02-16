import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { IcoComponent } from './ico.component';
import {
  IcoContentComponent,
  IcoStatusComponent,
  EditIcoComponent,
  AddIcoComponent
} from './components';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/icos/ongoing/', pathMatch: 'full' },
  {
    path: 'icos', component: IcoComponent, data: {title: 'ICOs'},
    children: [
      { path: '', redirectTo: 'ongoing/', pathMatch: 'full'},
      { path: ':status', component: IcoStatusComponent,
        children: [
          { path: ':slug', component: IcoContentComponent }
      ]},
    ]
  },
  { path: 'ico/add', component: AddIcoComponent },
  { path: 'ico/edit', component: EditIcoComponent },
  //{ path: '**', redirectTo: 'icos'}
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IcoRoutingModule { }
