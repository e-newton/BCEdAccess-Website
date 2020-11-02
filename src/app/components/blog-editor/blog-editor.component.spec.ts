import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BlogEditorComponent } from './blog-editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {BlogRootComponent} from '../blog-root/blog-root.component';
import {FormsModule, NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';
import {Test} from 'tslint';

describe('BlogEditorComponent', () => {
  let component: BlogEditorComponent;
  let fixture: ComponentFixture<BlogEditorComponent>;
  let blogService: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
      FormsModule],
      providers: [BlogService],
      declarations: [ BlogEditorComponent]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BlogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogService = TestBed.inject(BlogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update with valid id if generated invalid id', fakeAsync( () => {

    const blogSpy = spyOn(blogService, 'isBlogIDValid').and.returnValues(Promise.resolve(false),
                                                                                  Promise.resolve(true),
                                                                                  Promise.resolve(true));
    let editor: BlogEditorComponent;
    editor = new BlogEditorComponent(blogService);
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
    editor = new BlogEditorComponent(blogService);
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(editor.id).toBeTruthy();
  }));

  it('should create a valid blog', () => {
    component.id = 1;
    component.body = 'body';
    component.author = 'author';
    component.title = 'title';
    expect(component.createBlog()).toEqual(new Blog(1, 'title', 'author', 'body'));
  });

  it('should post a blog successfully', fakeAsync(() => {
    const testForm = {
      value: {
        id: '1',
        body: 'body',
        author: 'author',
        title: 'title'
      }
    } as NgForm;
    const blogSpy = spyOn(blogService, 'postBlog').and.returnValues(Promise.resolve(true));
    component.id = 1;
    component.onSubmit(testForm);
    tick(100);
    expect(component.backendResponse).toEqual('Blog successfully posted!');
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(component.createBlog());

  }));

  it('should post a blog unsuccessfully', fakeAsync(() => {
    const testForm = {
      value: {
        id: '1',
        body: 'body',
        author: 'author',
        title: 'title'
      }
    } as NgForm;
    const blogSpy = spyOn(blogService, 'postBlog').and.returnValues(Promise.resolve(false));
    component.id = 1;
    component.onSubmit(testForm);
    tick(100);
    expect(component.backendResponse).toEqual('An error has occurred');
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(blogSpy).toHaveBeenCalledWith(component.createBlog());
  }));



});
