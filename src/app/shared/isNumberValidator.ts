import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value.trim();
    const type = typeof value;
    if (type !== 'number' && type !== 'string') {
      return {'notNumber': true};
    }
    const n = +value;
    const isNumber = (n - n + 1) >= 0 && value !== '';
    return isNumber ? null : {'notNumber': true};
  };
}
