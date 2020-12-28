import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../../services/blog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-draft-widget',
  templateUrl: './draft-widget.component.html',
  styleUrls: ['./draft-widget.component.css']
})
export class DraftWidgetComponent implements OnInit {
  blogs = [];

  constructor(public blogService: BlogService, public router: Router) {
    blogService.getAllDraftBlogs().then((blogs) => {
      this.blogs = blogs;
    });
  }

  async deleteBlog(id: number): Promise<void> {
    await this.blogService.deleteBlog(String(id));
    this.blogs = [];
    this.blogs = await this.blogService.getAllDraftBlogs();
  }

  ngOnInit(): void {
  }

  async publishBlog(id: number): Promise<void> {
    await this.blogService.publishBlog(String(id));
    this.blogs = [];
    this.blogs = await this.blogService.getAllDraftBlogs();
  }
}
