import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


// export function matchingControlValidator(controlName: AbstractControl, matchingControlName: AbstractControl) {
//   return (formGroup: FormGroup) => {

//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//           return;
//       }

//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }

export const passwordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  if (form.get('password').value === form.get('confirmPassword').value) {
    return null;
  }
  else{
    return {mismatch: true}
  };
}
