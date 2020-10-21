import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRootComponent } from './blog-root.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, RouterModule} from '@angular/router';

describe('BlogRootComponent', () => {
  let component: BlogRootComponent;
  let fixture: ComponentFixture<BlogRootComponent>;

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
    fixture = TestBed.createComponent(BlogRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
