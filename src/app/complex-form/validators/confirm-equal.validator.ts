import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function ConfirmEqualValidator(firstField: string, secondField: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.get(firstField)?.value === ctrl.get(secondField)?.value) {
      return null
    } else {
      return { notEqual: ctrl.value }
    }
  }
 }
