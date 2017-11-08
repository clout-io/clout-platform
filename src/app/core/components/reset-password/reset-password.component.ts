import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services';
import { emailValidator, numbersValidator, uppercaseValidator } from '../../../shared';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPassForm: FormGroup;
  errorReset = false;
  msg: string;
  showMsg = false;
  showPasswordsInputs = false;
  private route$: any;
  private code: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route$ = this.route.queryParams.subscribe((params: Params) => {
      this.code = params['code'];
      this.showPasswordsInputs = !!this.code;

      this.resetPassForm = this.formBuilder.group({
        email: ['', [Validators.required, emailValidator(/\S+@\S+\.\S+/)]],
        password: this.createPasswordValidation(),
        password_confirm: this.createPasswordValidation()
      });
    });

    this.resetPassForm.get('email').valueChanges
      .subscribe(data => this.showMessage(false, ''));
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

  reset() {
    const emailI = this.resetPassForm.get('email'),
          passwordI = this.resetPassForm.get('password'),
          password_confirmI = this.resetPassForm.get('password_confirm');

    for (let inputName in this.resetPassForm.controls) {
      this.resetPassForm.get(inputName).markAsTouched();
    }

    if (!!this.code && passwordI.valid && password_confirmI.valid) {
      const { password, password_confirm} = this.resetPassForm.value;
      const data = {password, confirmPassword: password_confirm};
      this.auth.resetUserPasswordCode(this.code, data)
        .subscribe(
          data => {
            if(data.token) {
              const msg = 'The password successfully changed';
              this.showMessage(true, msg);
              setTimeout(() => {
                this.router.navigateByUrl('/');
              }, 2000);
            }
          }, error => {
            this.errorReset = true;
          });

    } else if (emailI.valid) {
      this.sendEmail(emailI.value);
    }
  }

  sendEmail(email: string) {
    this.auth.resetUserPassword(email)
      .subscribe(data => {
        const msg = 'We have sent a link to your email address. Please check.';
        this.showMessage(true, msg);
      });
  }

  showMessage(show: boolean, msg: string) {
    this.showMsg = show;
    this.msg = msg;
    this.errorReset = false;
  }

  ngOnDestroy(): void {
    this.route$.unsubscribe();
  }

}
