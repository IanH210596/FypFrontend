import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export const passwordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  if (form.get('password').value === form.get('confirmPassword').value) {
    // if the form's password and confirm password control values match then null is returned
    return null;
  }
  else{
    // else a mismatch = true validation error is returned
    return {mismatch: true}
  };
}
