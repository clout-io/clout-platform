import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services';
import { emailValidator, numbersValidator, uppercaseValidator } from '../../../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: FormGroup;
  errorLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.account = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, uppercaseValidator(/[A-Z]+/), numbersValidator(/[0-9]+/)]]
    });
  }

  login() {
    if (this.account.valid) {
      this.auth.signin();
    }
  }

}
