import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {BlogRootComponent} from './blog-root.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BlogService} from '../../services/blog.service';
import {RouterModule} from '@angular/router';
import {Blog} from '../../model/blog';


describe('BlogRootComponent', () => {
  let component: BlogRootComponent;
  let fixture: ComponentFixture<BlogRootComponent>;
  let httpTestingController: HttpTestingController;
  let blogService: BlogService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterModule.forRoot([])],
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
    const req = httpTestingController.expectOne('/api/blogs/');
    req.flush([]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data for no blogs', fakeAsync(() => {

    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const req = httpTestingController.expectOne('/api/blogs/');
    req.flush([]);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.blogs.length).toEqual(0);

  }));

  it('should have the correct data for single blogs', fakeAsync(async () => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1');
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const req = httpTestingController.expectOne('/api/blogs/');
    req.flush([b1]);
    expect(component.ngOnInit).toHaveBeenCalled();
    tick();
    expect(component.blogs.length).toEqual(1);

  }));

  it('should have the correct data for multiple blogs', fakeAsync(() => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1');
    const b2: Blog = new Blog(2, 'title2', 'author2', 'body2');
    const b3: Blog = new Blog(3, 'title3', 'author3', 'body3');
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const req = httpTestingController.expectOne('/api/blogs/');
    req.flush([b1, b2, b3]);
    expect(component.ngOnInit).toHaveBeenCalled();
    tick();
    expect(component.blogs.length).toEqual(3);
  }));

  it('should delete a blog', fakeAsync(() => {
    const b1: Blog = new Blog(1, 'title1', 'author1', 'body1');
    const b2: Blog = new Blog(2, 'title2', 'author2', 'body2');
    const b3: Blog = new Blog(3, 'title3', 'author3', 'body3');
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
