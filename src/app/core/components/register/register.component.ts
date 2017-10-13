import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator, numbersValidator, uppercaseValidator } from '../../../shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.account = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, uppercaseValidator(/[A-Z]+/), numbersValidator(/[0-9]+/)]],
      password_confirm: ['', [Validators.required, uppercaseValidator(/[A-Z]+/), numbersValidator(/[0-9]+/)]]
    });
  }

  register() {
  }

}
