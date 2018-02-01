import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isUrlValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value.trim();
    const reg = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const isValid = reg.test(value);
    return !!isValid ? null : {'urlNotValid': true};
  };
}
