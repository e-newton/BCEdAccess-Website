import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {FormControl, NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

  // TODO, ckeditor babbyyyyy

  public Editor = ClassicEditor;

  id: number;
  title = '';
  author = '';
  body = '';
  backendResponse = '';
  titleFC = new FormControl('');
  authorFC = new FormControl('');
  bodyFC = new FormControl('');
  editing = false;

  constructor(private blogService: BlogService, public activatedRouter: ActivatedRoute, public route: Router) {
    if (this.activatedRouter.snapshot.paramMap.get('id')){
      this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
      blogService.getSingleBlog(String(this.id)).then((rows) => {
        const blog: Blog = rows[0];
        this.title = blog.title;
        this.author = blog.author;
        this.body = blog.body;
        this.titleFC.setValue(this.title);
        this.authorFC.setValue(this.author);
        this.bodyFC.setValue(this.body);
        this.editing = true;
      });
    } else {
      this.generateID().then((n) => this.id = n);
    }
  }

  async generateID(): Promise<number> {
    let n = this.random(3, 100);
    let valid = await this.blogService.isBlogIDValid(String(n));
    while (!valid) {
      n = this.random(3, 100);
      valid = await this.blogService.isBlogIDValid(String(n));
    }
    return n;
  }

  ngOnInit(): void {
  }

  random(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
  }

  onSubmit(f: NgForm): void {
      this.title = this.titleFC.value;
      this.author = this.authorFC.value;
      this.body = this.bodyFC.value;
      if (this.editing){
        this.blogService.updateBlog(this.createBlog()).then((res) => {
          if (res) {
            this.backendResponse = 'Blog successfully posted!';
          } else {
            this.backendResponse = 'An error has occurred';
          }
        });
      } else{
        this.blogService.postBlog(this.createBlog()).then((res) => {
          if (res) {
            this.backendResponse = 'Blog successfully posted!';
          } else {
            this.backendResponse = 'An error has occurred';
          }
        });
      }


  }

  createBlog(): Blog {
    return new Blog(this.id, this.title, this.author, this.body);
  }
}
