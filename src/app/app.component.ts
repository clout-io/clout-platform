import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fb: FacebookService) {

    const initParams: InitParams = {
      appId: '913950675449647',
      xfbml: true,
      version: 'v2.11'
    };

    fb.init(initParams);
  }

}
