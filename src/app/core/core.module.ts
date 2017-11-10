import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PercentPipe } from './../pipes';

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
  ModalComponent,
  CommentListComponent,
  FollowBtnComponent,
  LoaderLineComponent,
  ResetPasswordComponent
} from './components';
import {
  CommentItemComponent
} from './components/comment-list/components';

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
    ModalComponent,
    CommentListComponent,
    CommentItemComponent,
    FollowBtnComponent,
    LoaderLineComponent,
    ResetPasswordComponent,
    PercentPipe
  ],
  exports: [
    CommentListComponent,
    ModalComponent,
    FollowBtnComponent,
    LoaderLineComponent,
    PercentPipe
  ]
})
export class CoreModule { }
