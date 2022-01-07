import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function dateRangeValidator(
  startDateField: string,
  endDateField: string
): ValidatorFn {

  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start: string = formGroup.get(startDateField)?.value;
    const end: string = formGroup.get(endDateField)?.value;

    const startString = start.split('-');
    const endString = end.split('-');

    const startTime = new Date(
      Number(startString[0]),
      Number(startString[1]),
      Number(startString[2])
    );
    const endTime = new Date(
      Number(endString[0]),
      Number(endString[1]),
      Number(endString[2])
    );

    if (startTime && endTime) {
      const isRangeValid = (
        endTime.getTime() - startTime.getTime() >= 0
      );

      return isRangeValid ? null : { dateRange: true };
    }

    return null;
  };
}
