import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const yes = nameRe.test(name);
    return yes ? null : {'emailFormat': {name}};
  };
}
