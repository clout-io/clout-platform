import { Routes } from '@angular/router';

import { AuthService } from '../services/auth';
import { ShellComponent } from './shell/shell.component';
import {
  LoginComponent,
  RegisterComponent,
  ConfirmUserComponent,
  SocialFacebookComponent
} from './components';

/**
 * Provides helper methods to create routes.
 */
export class CoreRoute {

  /**
   * Creates routes using the shell component.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withShell(routes: Routes): Routes {
    return [
      {
        path: '',
        component: ShellComponent,
        children: routes,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [
          AuthService
        ]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [
          AuthService
        ]
      },
      {
        path: 'activate',
        component: ConfirmUserComponent
      },
      {
        path: 'social/facebook',
        component: SocialFacebookComponent
      }
    ];
  }

}
