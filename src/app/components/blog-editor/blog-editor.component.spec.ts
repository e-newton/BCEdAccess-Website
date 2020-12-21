import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BlogEditorComponent } from './blog-editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {BlogRootComponent} from '../blog-root/blog-root.component';
import {FormControl, FormsModule, NgControl, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Blog} from '../../model/blog';
import {Test} from 'tslint';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';
import {CKEditorComponent, CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ViewChild} from '@angular/core';

describe('BlogEditorComponent', () => {
  let component: BlogEditorComponent;
  let fixture: ComponentFixture<BlogEditorComponent>;
  let blogService: BlogService;
  let activatedRoute: ActivatedRoute;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
      FormsModule,
      RouterTestingModule.withRoutes(routes),
      ReactiveFormsModule, FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
      CKEditorModule],
      providers: [BlogService],
      declarations: [ BlogEditorComponent, CKEditorComponent]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BlogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogService = TestBed.inject(BlogService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    component.editorComponent = TestBed.createComponent(CKEditorComponent).componentInstance as CKEditorComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update with valid id if generated invalid id', fakeAsync( () => {

    const blogSpy = spyOn(blogService, 'isBlogIDValid').and.returnValues(Promise.resolve(false),
                                                                                  Promise.resolve(true),
                                                                                  Promise.resolve(true));
    let editor: BlogEditorComponent;
    editor = new BlogEditorComponent(blogService, route, router);
    tick(100);
    blogService.isBlogIDValid(String(editor.id)).then((res) => {
      expect(blogSpy).toHaveBeenCalled();
      expect(res).toBeTrue();
      expect(editor.id).toBeTruthy();
    });
  }));

  it('should be fine with a single call to the blog service', fakeAsync( () => {
    const blogSpy = spyOn(blogService, 'isBlogIDValid').and.returnValues(Promise.resolve(true));
    let editor: BlogEditorComponent;
    editor = new BlogEditorComponent(blogService, route, router);
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(editor.id).toBeTruthy();
  }));

  it('should create a valid blog', () => {
    component.editorComponent = TestBed.createComponent(CKEditorComponent).componentInstance as CKEditorComponent;
    component.id = 1;
    component.editorComponent.data = 'body';
    component.author = 'author';
    component.title = 'title';
    expect(component.createBlog()).toEqual(new Blog(1, 'title', 'author', 'body', 0));
  });

  it('should post a blog successfully', fakeAsync(() => {
    const blogSpy = spyOn(blogService, 'postBlog').and.returnValues(Promise.resolve(true));
    component.id = 1;
    component.onSubmit();
    tick(100);
    expect(component.backendResponse).toEqual('Blog successfully posted!');
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(component.createBlog());

  }));

  it('should post a blog unsuccessfully', fakeAsync(() => {
    const blogSpy = spyOn(blogService, 'postBlog').and.returnValues(Promise.resolve(false));
    component.id = 1;
    component.onSubmit();
    tick(100);
    expect(component.backendResponse).toEqual('An error has occurred');
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(component.createBlog());
  }));

  it('should get id from router', fakeAsync(() => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get').and.returnValues('123', '123');
    component = new BlogEditorComponent(blogService, route, router);
    tick(100);
    expect(component).toBeTruthy();
    expect(component.id).toEqual(123);
  }));

  it('should get an existing blog from the db', fakeAsync(() => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get').and.returnValues('123', '123');
    const blogSpy = spyOn(blogService, 'getSingleBlog')
      .and.returnValues(Promise.resolve([new Blog(123, 'title', 'author', 'body', 42)]));
    component = new BlogEditorComponent(blogService, route, router);
    component.editorComponent = TestBed.createComponent(CKEditorComponent).componentInstance as CKEditorComponent;
    component.ngAfterViewInit();
    tick(300);
    expect(component).toBeTruthy();
    expect(component.id).toEqual(123);
    expect(component.title).toEqual('title');
    expect(component.body).toEqual('body');
    expect(component.author).toEqual('author');
    expect(component.views).toEqual(42);
    expect(spyRoute).toHaveBeenCalledWith('id');
    expect(spyRoute).toHaveBeenCalledTimes(2);
    expect(blogSpy).toHaveBeenCalledWith('123');
    expect(blogSpy).toHaveBeenCalledTimes(1);
  }));

  it('should load forms with the value from the given blog', fakeAsync(() => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get').and.returnValues('123', '123');
    const blogSpy = spyOn(blogService, 'getSingleBlog')
      .and.returnValues(Promise.resolve([new Blog(123, 'title', 'author', 'body', 42)]));
    component = new BlogEditorComponent(blogService, route, router);
    component.editorComponent = TestBed.createComponent(CKEditorComponent).componentInstance as CKEditorComponent;
    component.ngAfterViewInit();
    tick(500);
    expect(spyRoute).toHaveBeenCalledWith('id');
    expect(spyRoute).toHaveBeenCalledTimes(2);
    expect(blogSpy).toHaveBeenCalledWith('123');
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(component.titleFC.value).toEqual('title');
    expect(component.authorFC.value).toEqual('author');
    expect(component.editorComponent.data).toEqual('body');
    expect(component.views).toEqual(42);
  }));



});
