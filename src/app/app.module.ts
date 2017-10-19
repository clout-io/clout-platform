import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { IcoModule } from './ico/ico.module';
import { AuthService, ApiService, ApiHelperService, BroadcastService } from './services';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ico-ng'}),
    // external modules
    NgbModule.forRoot(),
    // internal modules
    CoreModule,
    IcoModule,
    // base routing modules
    AppRoutingModule,
    HttpModule
  ],
  providers: [AuthService, ApiService, ApiHelperService, BroadcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
