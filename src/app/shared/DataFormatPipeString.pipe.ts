import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatString'
})
export class DateFormatStringPipe implements PipeTransform {
  transform(value: string) {
    return (
      value.substring(6, 10) +
      '-' +
      value.substring(3, 5) +
      '-' +
      value.substring(0, 2)
    );
  }
}
