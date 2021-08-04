import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export const passwordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  if (form.get('password').value === form.get('confirmPassword').value) {
    return null;
  }
  else{
    return {mismatch: true}
  };
}
