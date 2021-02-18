import {fakeAsync, TestBed} from '@angular/core/testing';
import {Meta} from '@angular/platform-browser';


import {SeoService} from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate default tags with no config given', fakeAsync(() => {
    const htmlSpy = spyOn(meta, 'updateTag').and.stub();
    const genSpy = spyOn(service, 'generateTags').and.stub();
    service.generateTags({});
    expect(genSpy).toHaveBeenCalledWith({});
    expect(htmlSpy).toHaveBeenCalledWith({ name: 'twitter:card', content: 'summary' });
  }));
});
