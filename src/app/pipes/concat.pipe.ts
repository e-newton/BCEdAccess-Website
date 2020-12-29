import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat'
})
export class ConcatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 47) {
      return value.slice(0, 46).concat('...');
    }
    return value;
  }

}
