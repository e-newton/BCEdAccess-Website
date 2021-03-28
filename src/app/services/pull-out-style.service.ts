import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {max} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PullOutStyleService {
  public font = 'arial';
  public size = 100;

  constructor(@Inject(DOCUMENT) private document: Document) {
      // this.changeFont('arial');
      // document.documentElement.style.setProperty('--background-colour', 'black');
      // document.documentElement.style.setProperty('--font-colour', 'white');
  }

  public changeFont(font: string): void{
    document.getElementById('document-body').className = font;
    this.font = font;
  }
  public increaseFontSize(): void{
    this.size += 10;
    this.size = Math.min(this.size, 200);
    document.getElementById('html').style.fontSize = this.size + '%';
  }
  public decreaseFontSize(): void{
    this.size -= 10;
    this.size = Math.max(this.size, 20);
    document.getElementById('html').style.fontSize = this.size + '%';
  }
}
