import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesFormat'
})
export class MesFormatPipe implements PipeTransform {
  transform(value: string) {

    const data = value.slice(5, 7);
    let mes = '';

    switch (data) {
      case '01': {
        mes = 'JAN';
        break;
      }
      case '02': {
        mes = 'FEV';
        break;
      }
      case '03': {
        mes = 'MAR';
        break;
      }
      case '04': {
        mes = 'ABR';
        break;
      }
      case '05': {
        mes = 'MAI';
        break;
      }
      case '06': {
        mes = 'JUN';
        break;
      }
      case '07': {
        mes = 'JUL';
        break;
      }
      case '08': {
        mes = 'AGO';
        break;
      }
      case '09': {
        mes = 'SET';
        break;
      }
      case '10': {
        mes = 'OUT';
        break;
      }
      case '11': {
        mes = 'NOV';
        break;
      }
      case '12': {
        mes = 'DEZ';
        break;
      }
      default: {
        break;
      }
    }

    return mes;
  }
}
