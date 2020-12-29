import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {BlogRootComponent} from './blog-root.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BlogService} from '../../services/blog.service';
import {RouterModule} from '@angular/router';
import {Blog} from '../../model/blog';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';


describe('BlogRootComponent', () => {
  let component: BlogRootComponent;
  let fixture: ComponentFixture<BlogRootComponent>;
  let httpTestingController: HttpTestingController;
  let blogService: BlogService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase)],
      providers: [BlogService],
      declarations: [ BlogRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BlogRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogService = TestBed.inject(BlogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data for no blogs', fakeAsync(() => {
    const blogServiceSpy = spyOn(blogService, 'getAllNonDraftBlogs').and.returnValue(Promise.resolve([]));
    const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    tick(200);
    expect(initSpy).toHaveBeenCalled();
    expect(component.blogs.length).toEqual(0);
    expect(blogServiceSpy).toHaveBeenCalledTimes(1);

  }));

  it('should have the correct data for single blogs', fakeAsync(async () => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1', 1, false);
    const blogServiceSpy = spyOn(blogService, 'getAllNonDraftBlogs').and.returnValue(Promise.resolve([b1]));
    const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    tick(200);
    expect(initSpy).toHaveBeenCalled();
    expect(component.blogs).toContain(b1);
    expect(component.blogs.length).toEqual(1);
    expect(blogServiceSpy).toHaveBeenCalledTimes(1);

  }));

  it('should have the correct data for multiple blogs', fakeAsync(() => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1', 5, false);
    const b2: Blog = new Blog(2, 'title2', 'author2', 'body2', 6, false);
    const b3: Blog = new Blog(3, 'title3', 'author3', 'body3', 7, false);
    const blogServiceSpy = spyOn(blogService, 'getAllNonDraftBlogs').and.returnValue(Promise.resolve([b1, b2, b3]));
    const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    tick(200);
    expect(initSpy).toHaveBeenCalled();
    expect(component.blogs.length).toEqual(3);
    expect(component.blogs).toContain(b1);
    expect(component.blogs).toContain(b2);
    expect(component.blogs).toContain(b3);
    expect(blogServiceSpy).toHaveBeenCalledTimes(1);
  }));

  it('should delete a blog', fakeAsync(() => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1', 2, false);
    const b2: Blog = new Blog(2, 'title2', 'author2', 'body2', 3, false);
    const b3: Blog = new Blog(3, 'title3', 'author3', 'body3', 4, false);
    component.blogs.push(b1, b2, b3);
    const blogSpy = spyOn(blogService, 'deleteBlog').and.returnValue(Promise.resolve(true));
    component.deleteBlog(1);
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith('1');
    expect(component.blogs).toContain(b2);
    expect(component.blogs).toContain(b3);
    expect(component.blogs).not.toContain(b1);
  }));


});
