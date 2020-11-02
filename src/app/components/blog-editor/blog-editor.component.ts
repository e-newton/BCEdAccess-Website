import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

  id: number;
  title = '';
  author = '';
  body = '';
  backendResponse = '';

  constructor(private blogService: BlogService, public activatedRouter: ActivatedRoute, public route: Router) {
    if (this.activatedRouter.snapshot.paramMap.get('id')){
      this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
      // Get the data and place it in the editor
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
      console.log(f.value);
      this.title = f.value.title;
      this.author = f.value.author;
      this.body = f.value.html;
      this.blogService.postBlog(this.createBlog()).then((res) => {
        if (res) {
          this.backendResponse = 'Blog successfully posted!';
        } else {
          this.backendResponse = 'An error has occurred';
        }
      });

  }

  createBlog(): Blog {
    return new Blog(this.id, this.title, this.author, this.body);
  }
}
