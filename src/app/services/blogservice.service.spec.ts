import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BlogserviceService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    service = TestBed.inject(BlogService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
