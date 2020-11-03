import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Blog} from '../model/blog';

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

    const req = httpTestingController.expectOne('/api/blogs/?id=123');
    expect(req.request.method).toEqual('GET');
    req.flush(mockBlog);

  });

  it('should fail to retrieve a single blog', () => {
    service.getSingleBlog('0').then((blog) => {
      expect(blog).toEqual({});
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=0');
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should cause a 404 error due to a formatting error', () => {
    service.getSingleBlog('test').then((blog) => {
    }).catch((reason) => {
      expect(reason.status).toEqual(404);
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=test');
    expect(req.request.method).toEqual('GET');

    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should post a blog', () => {

    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    service.postBlog(blog).then((response) => {
      expect(response).toBeTrue();
    }).catch((e) => {
      fail('this shouldn\'t happen');
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=123');
    expect(req.request.method).toEqual('POST');
    req.flush({success: true});
  });

  it('should fail to post a blog', () => {
    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    service.postBlog(blog).then((response) => {
      expect(response).toBeFalse();
    }).catch(() => {
      fail('this shouldn\'t happen');
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=123');
    expect(req.request.method).toEqual('POST');
    req.flush({success: false});
  });

  it('should get all the blogs', () => {
    const blog1: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blog2: Blog = new Blog(124, 'title', 'author', '<h1>body</h1>');
    service.getAllBlogs().then((response) => {
      expect(response).toContain(blog1);
      expect(response).toContain(blog2);
    });
    const req = httpTestingController.expectOne('/api/blogs/');
    expect(req.request.method).toEqual('GET');
    req.flush([blog1, blog2]);
  });

  it('should return true for a valid id', () => {
    service.isBlogIDValid('123').then((res) => {
      expect(res).toBeTrue();
    }).catch((e) => {
      fail('this should not happen');
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=123');
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('should return false for a valid id', () => {
    service.isBlogIDValid('123').then((res) => {
      expect(res).toBeFalse();
    }).catch(() => {
      fail('this should not happen');
    });
    const req = httpTestingController.expectOne('/api/blogs/?id=123');
    expect(req.request.method).toEqual('GET');
    req.flush([new Blog(444, 'title', 'author', 'body')]);
  });
});
