import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';

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

  constructor(private blogService: BlogService) {
    this.generateID().then((n) => this.id = n);
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
        console.log('Post Response', res);
      });

  }

  createBlog(): Blog {
    return new Blog(this.id, this.title, this.author, this.body);
  }
}
