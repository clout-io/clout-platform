import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, BroadcastService } from '../../../services';
import { emailValidator, numbersValidator, uppercaseValidator } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  account: FormGroup;
  errorLogin = false;
  resetInputSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private broadcastService: BroadcastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.account = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator(/\S+@\S+\.\S+/)]],
      password: ['',
        Validators.compose([
          Validators.required,
          uppercaseValidator(/[A-Z]+/),
          numbersValidator(/[0-9]+/)
        ])
      ]
    });
    this.resetInputSubscription = this.broadcastService.subscribe('resetInput',
        inputName => this.resetInputField(inputName));
  }

  login() {
    if (this.account.invalid) {
      for (let inputName in this.account.controls) {
        this.account.get(inputName).markAsTouched();
      }
      return;
    }

    const {email, password} = this.account.value;
    this.auth.signin({email, password})
      .subscribe(
        data => {
          this.errorLogin = false;
          this.router.navigateByUrl('/');
        },
        error => this.errorLogin = true
      );
  }

  resetInputField(inputName) {
    this.account.get(inputName).reset();
  }

  ngOnDestroy(): void {
    this.resetInputSubscription.unsubscribe();
  }

}
