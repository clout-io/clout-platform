import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import {
  HeaderComponent,
  ShellComponent
} from './shell';
import {
  LoginComponent,
  RegisterComponent,
  ConfirmUserComponent,
  SocialFacebookComponent,
  ResetInputBtnComponent,
  FacebookAuthBtnComponent,
  ModalComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmUserComponent,
    SocialFacebookComponent,
    ResetInputBtnComponent,
    FacebookAuthBtnComponent,
    ModalComponent
  ]
})
export class CoreModule { }
