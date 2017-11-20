import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { IcoComponent } from './ico.component';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/icos', pathMatch: 'full' },
  { path: 'icos', component: IcoComponent, data: {title: 'ICOs' }},
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcoRoutingModule { }
