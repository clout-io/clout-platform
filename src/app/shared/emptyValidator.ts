import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value;
    return !!value && !!value.trim().length ? null : {'empty': true};
  };
}
