import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidad'
})
export class UnidadPipe implements PipeTransform {
  transform(value: number, of: string): string {
    if(of === 'Presion') {
      return value + ' Cb';
    }
    return '';
  }
}
