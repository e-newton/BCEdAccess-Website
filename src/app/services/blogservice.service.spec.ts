import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('BlogserviceService', () => {
  let service: BlogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BlogService);


  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a single blog', () => {
    const mockBlog = {
    id: 123, title: 'blog title', author: 'blog author', body: '<h1>Hello World!</h1>'
    };

    service.getSingleBlog('123').then((blog) => {
      expect(blog.title).toEqual(mockBlog.title);
      expect(blog.id).toEqual(mockBlog.id);
      expect(blog.author).toEqual(mockBlog.author);
      expect(blog.body).toEqual(mockBlog.body);
      });

    const req = httpTestingController.expectOne('http://localhost:8080/api/blogs/?id=123');
    expect(req.request.method).toEqual('GET');
    req.flush(mockBlog);

  });
});
