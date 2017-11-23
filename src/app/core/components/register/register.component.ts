import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator, numbersValidator, uppercaseValidator } from '../../../shared';
import { AuthService, ApiService, BroadcastService } from '../../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  account: FormGroup;
  resetInputSubscription: any;
  errorMessage: string;
  errorRegister: boolean;
  showVerificationMessage: boolean;
  disableRegisterBtn = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private broadcastService: BroadcastService
  ) {}

  ngOnInit() {
    this.account = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, emailValidator(/\S+@\S+\.\S+/)]],
      password: this.createPasswordValidation(),
      password_confirm: this.createPasswordValidation()
    });
    this.resetInputSubscription = this.broadcastService.subscribe('resetInput',
        inputName => this.resetInputField(inputName));
  }

  createPasswordValidation() {
    return ['',
      Validators.compose([
        Validators.required,
        uppercaseValidator(/[A-Z]+/),
        numbersValidator(/[0-9]+/),
        Validators.minLength(6)
      ])
    ];
  }

  register() {
    console.log('this.account', this.account);
    if (this.account.invalid) {
      for (let inputName in this.account.controls) {
        this.account.get(inputName).markAsTouched();
      }
      return;
    }

    const {username, email, password, password_confirm} = this.account.value;
    const user = {username, email, password, confirmPassword: password_confirm};
    this.auth.authenticate(user)
      .subscribe(data => {
          this.disableRegisterBtn = true;
          this.manageErrorRegister(false, '');
          this.showVerificationMessage = true;
        },
        errorData => {
          if (errorData.error.code === 610) {
            this.manageErrorRegister(true, 'A record with that email already exists.');
          }
        });
  }

  resetInputField(inputName) {
    this.manageErrorRegister(false, '');
    this.account.get(inputName).reset();
  }

  manageErrorRegister(show: boolean, msg: string) {
    this.errorRegister = show;
    this.errorMessage = msg;
    this.showVerificationMessage = false;
  }

  ngOnDestroy(): void {
    this.resetInputSubscription.unsubscribe();
  }

}
