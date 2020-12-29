import { ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('DraftWidgetComponent', () => {
  let component: DraftWidgetComponent;
  let fixture: ComponentFixture<DraftWidgetComponent>;
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
});
