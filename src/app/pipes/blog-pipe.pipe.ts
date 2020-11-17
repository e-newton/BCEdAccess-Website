import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogPipe'
})
export class BlogPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
