import { SafeHTMLPipe } from './safe-html.pipe';
import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';

describe('SafeHTMLPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHTMLPipe(TestBed.inject(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
