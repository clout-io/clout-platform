import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { IcoComponent } from './ico.component';
import { IcoContentComponent } from './components/ico-content/ico-content.component';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/icos', pathMatch: 'full' },
  {
    path: 'icos', component: IcoComponent, data: {title: 'ICOs'},
    children: [
      { path: '', redirectTo: 'all/', pathMatch: 'full'},
      { path: ':status', component: IcoContentComponent },
      { path: ':status/:id', component: IcoContentComponent }
    ]
  },
  { path: '**', redirectTo: 'icos'}
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IcoRoutingModule { }
