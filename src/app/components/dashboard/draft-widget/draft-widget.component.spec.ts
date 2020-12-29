import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DraftWidgetComponent } from './draft-widget.component';
import {BlogService} from '../../../services/blog.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../app.module';
import {CKEditorComponent, CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {BlogEditorComponent} from '../../blog-editor/blog-editor.component';
import {Blog} from '../../../model/blog';

describe('DraftWidgetComponent', () => {
  let component: DraftWidgetComponent;
  let fixture: ComponentFixture<DraftWidgetComponent>;
  let blogService: BlogService;
  let activatedRoute: ActivatedRoute;
  let route: ActivatedRoute;
  let router: Router;
  const b1 = new Blog(1, 'Title', 'Author', 'Body', 42, true, new Date(), false);
  const b2 = new Blog(2, 'Title', 'Author', 'Body', 42, true, new Date(), false);

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

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogService = TestBed.inject(BlogService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load with all draft blogs', fakeAsync(() => {
    const blogSpy = spyOn(blogService, 'getAllDraftBlogs').and.returnValues(Promise.resolve([b1, b2]));
    component = new DraftWidgetComponent(blogService, router);
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(component.blogs).toContain(b1);
    expect(component.blogs).toContain(b2);
  }));

  it('should delete a blog', fakeAsync(async () => {
    const delSpy = spyOn(blogService, 'deleteBlog').and.stub();
    const draftSpy = spyOn(blogService, 'getAllDraftBlogs').and.returnValues(Promise.resolve([b2]));
    component.blogs = [b1, b2];
    await component.deleteBlog(b1.id);
    expect(delSpy).toHaveBeenCalledWith(String(b1.id));
    expect(delSpy).toHaveBeenCalledTimes(1);
    expect(draftSpy).toHaveBeenCalledTimes(1);
    expect(component.blogs).not.toContain(b1);
  }));

  it('should publish a blog', fakeAsync(async () => {
    const pubSpy = spyOn(blogService, 'publishBlog').and.stub();
    const draftSpy = spyOn(blogService, 'getAllDraftBlogs').and.returnValues(Promise.resolve([b2]));
    component.blogs = [b1, b2];
    await component.publishBlog(b1.id);
    expect(pubSpy).toHaveBeenCalledWith(String(b1.id));
    expect(pubSpy).toHaveBeenCalledTimes(1);
    expect(draftSpy).toHaveBeenCalledTimes(1);
    expect(component.blogs).not.toContain(b1);
  }));
});
