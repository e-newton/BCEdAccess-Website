import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {NgForm} from '@angular/forms';

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

  constructor(private blogSerivce: BlogService) {
    this.id = this.random(3, 100);
  }

  ngOnInit(): void {
  }

  random(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
  }

  onSubmit(f: NgForm): void {
      console.log(f.value);
  }
}
