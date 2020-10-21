import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditorComponent } from './blog-editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {BlogRootComponent} from '../blog-root/blog-root.component';
import {FormsModule} from '@angular/forms';

describe('BlogEditorComponent', () => {
  let component: BlogEditorComponent;
  let fixture: ComponentFixture<BlogEditorComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
