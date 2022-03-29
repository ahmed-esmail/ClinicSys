import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  pure: true
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(\d{2})(\d{3})(\d{2})(\d{3})/, '$01-$2-$3-$4');
  }

}
