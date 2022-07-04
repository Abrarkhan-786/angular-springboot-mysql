import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidateFileExtension(control: AbstractControl): { [key: string]: boolean } | null {
    let extension=control.value.split('.').pop()!=="xlsx";
  return extension?{ 'fileInvalid': true }:null;
}