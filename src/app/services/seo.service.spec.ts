import {fakeAsync, TestBed} from '@angular/core/testing';
import {Meta} from '@angular/platform-browser';


import {SeoService} from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    meta = TestBed.inject(Meta);
    service = TestBed.inject(SeoService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
