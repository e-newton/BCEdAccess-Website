import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogViewComponent } from './blog-view.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BlogService} from '../../services/blog.service';
import {BlogRootComponent} from '../blog-root/blog-root.component';

describe('BlogViewComponent', () => {
  let component: BlogViewComponent;
  let fixture: ComponentFixture<BlogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([])],
      providers: [BlogService],
      declarations: [ BlogRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
