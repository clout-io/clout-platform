import { ValidatorFn, AbstractControl } from '@angular/forms';

export function multiSelectEmptyValidator (): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const valuesArray = control.value || [];
    const values = valuesArray.filter(item => item.trim().length > 1);
    return values.length > 0 ? null : {'requiredError': true };
  };
}
