import { Injectable } from '@angular/core';
import {Meta} from '@angular/platform-browser';

export type Tags = {
  title: string,
  description: string,
  image: string,
  slug: string,
};

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  public generateTags(config: Tags): void {
    // default values
    config = {
      title: 'BCEdAccess',
      description: 'My SEO friendly Angular Component',
      image: 'https://firebasestorage.googleapis.com/v0/b/bcedaccess-website.appspot.com/o/images%2Fbcedaccess_logo.png?alt=media&token=d6c1b4d0-412e-4149-bc7b-70f5cd07a362',
      slug: '',
      ...config
    };

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@BCEdAccess' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'BCEdAccess Society' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://bcedaccess-website.web.app/${config.slug}` });
  }
}
