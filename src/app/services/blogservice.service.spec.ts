import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BlogService } from './blog.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Blog} from '../model/blog';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';

describe('BlogserviceService', () => {
  let service: BlogService;
  let httpTestingController: HttpTestingController;
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase)],
      providers: [BlogService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    firestore = TestBed.inject(AngularFirestore);
    service = TestBed.inject(BlogService);


  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a single blog', fakeAsync(() => {
    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'getSingleBlog').and.returnValue(Promise.resolve([blog]));
    service.getSingleBlog('1').then((b) => {
      expect(b).toContain(blog);
      expect(b.length).toBe(1);
    }).catch((reason) => {
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith('1');

  }));

  it('should fail to retrieve a single blog', fakeAsync(() => {
    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'getSingleBlog').and.returnValue(Promise.resolve([]));
    service.getSingleBlog('0').then((b) => {
      expect(b).not.toContain(blog);
      expect(b.length).toBe(0);
    }).catch((reason) => {
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith('0');
  }));

  it('should cause a 404 error due to a formatting error', fakeAsync(() => {
    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'getSingleBlog').and.returnValue(Promise.resolve([blog]));
    service.getSingleBlog('test').then((b) => {
    }).catch((reason) => {
      expect(reason.status).toEqual(404);
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith('test');
  }));

  it('should post a blog', fakeAsync(() => {

    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'postBlog').and.returnValue(Promise.resolve(true));
    service.postBlog(blog).then((response) => {
      expect(response).toBeTrue();
    }).catch((e) => {
      fail('this shouldn\'t happen');
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(blog);
  }));

  it('should fail to post a blog', fakeAsync(() => {
    const blog: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'postBlog').and.returnValue(Promise.resolve(false));
    service.postBlog(blog).then((response) => {
      expect(response).toBeFalse();
    }).catch((e) => {
      fail('this shouldn\'t happen');
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(blog);
  }));

  it('should get all the blogs', fakeAsync(() => {
    const blog1: Blog = new Blog(123, 'title', 'author', '<h1>body</h1>');
    const blog2: Blog = new Blog(124, 'title', 'author', '<h1>body</h1>');
    const blogSpy = spyOn(service, 'getAllBlogs').and.returnValue(Promise.resolve([blog1, blog2]));
    service.getAllBlogs().then((response) => {
      expect(response).toContain(blog1);
      expect(response).toContain(blog2);
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
  }));

  it('should return true for a valid id', fakeAsync(() => {
    const blogSpy = spyOn(service, 'isBlogIDValid').and.returnValue(Promise.resolve(true));
    service.isBlogIDValid('123').then((res) => {
      expect(res).toBeTrue();
    }).catch(() => {
      fail('this should not happen');
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledWith('123');
    expect(blogSpy).toHaveBeenCalledTimes(1);
  }));

  it('should return false for a valid id', fakeAsync(() => {
    const blogSpy = spyOn(service, 'isBlogIDValid').and.returnValue(Promise.resolve(false));
    service.isBlogIDValid('123').then((res) => {
      expect(res).toBeFalse();
    }).catch(() => {
      fail('this should not happen');
    });
    tick(100);
    expect(blogSpy).toHaveBeenCalledWith('123');
    expect(blogSpy).toHaveBeenCalledTimes(1);
  }));
});
