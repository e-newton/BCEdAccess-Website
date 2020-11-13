import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML'
})

// THIS IS SKETCHY, THIS MEANS THAT ANY HTML PASSED INTO THE BLOG EDITOR WILL BE ACCEPTED
// AHHHHHHHHHHHHHHHHHHHHHH
export class SafeHTMLPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
