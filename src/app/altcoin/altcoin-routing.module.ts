import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoute } from '../core/core.route';

// components
import { AltcoinComponent } from './altcoin.component';

const routes: Routes = CoreRoute.withShell([
  { path: '', redirectTo: '/altcoins', pathMatch: 'full' },
  { path: 'altcoins', component: AltcoinComponent },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltcoinRoutingModule { }
