import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-facebook-auth-btn',
  templateUrl: './facebook-auth-btn.component.html',
  styleUrls: ['./facebook-auth-btn.component.scss']
})
export class FacebookAuthBtnComponent implements OnInit {
  @Input() textButton: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  authWithFacebook() {
    this.auth.getFacebookUrlAndRedirect();
  }

}
