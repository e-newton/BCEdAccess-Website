import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBaseComponent } from './page-base.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';
import {BlogService} from '../../services/blog.service';
import {PageService} from '../../services/page.service';
import {Test} from 'tslint';

describe('PageBaseComponent', () => {
  let component: PageBaseComponent;
  let fixture: ComponentFixture<PageBaseComponent>;
  let pageService: PageService;
  let router: Router;
  let activeRouter: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase)],
      providers: [PageService],
      declarations: [ PageBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBaseComponent);
    component = fixture.componentInstance;
    pageService = TestBed.inject(PageService);
    router = TestBed.inject(Router);
    activeRouter = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
