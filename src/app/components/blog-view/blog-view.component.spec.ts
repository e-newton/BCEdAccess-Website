import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BlogViewComponent } from './blog-view.component';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BlogService} from '../../services/blog.service';
import {BlogRootComponent} from '../blog-root/blog-root.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../app-routing.module';
import {Observable, of} from 'rxjs';
import {Blog} from '../../model/blog';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';



describe('BlogViewComponent', () => {

  let component: BlogViewComponent;
  let fixture: ComponentFixture<BlogViewComponent>;
  let httpTestingController: HttpTestingController;
  let blogService: BlogService;
  let router: Router;
  let activedRouter: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebase)],
      providers: [BlogService, {
        provide: ActivatedRoute,
        useValue: {
          params: of({id: 123})
        }
      }],
      declarations: [ BlogRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BlogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogService = TestBed.inject(BlogService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    activedRouter = TestBed.inject(ActivatedRoute);

    await fixture.whenStable();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load when going to regular blog', fakeAsync(() => {
    const blogSpy = spyOn(blogService, 'getSingleBlog')
      .and.returnValue(Promise.resolve([new Blog(123, 'title', 'author', 'body')]));
    fixture.detectChanges();
    component = new BlogViewComponent(activedRouter, blogService, router);
    component.ngOnInit();
    tick(100);
    expect(blogSpy).toHaveBeenCalledTimes(1);
    expect(component.id).toEqual(123);
    expect(component.author).toEqual('author');
    expect(component.title).toEqual('title');
    expect(component.html).toEqual('body');

  }));

});
