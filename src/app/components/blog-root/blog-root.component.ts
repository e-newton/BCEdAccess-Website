import { Component, OnInit } from '@angular/core';
import {Blog} from '../../model/blog';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-blog-root',
  templateUrl: './blog-root.component.html',
  styleUrls: ['./blog-root.component.css']
})
export class BlogRootComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().then((res) => {
      res.forEach(blog => {
        console.log('BLOG', blog);
        this.blogs.push(blog);
      });
    });

  }

}
