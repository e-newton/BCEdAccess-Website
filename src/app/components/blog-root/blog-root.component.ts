import { Component, OnInit } from '@angular/core';
import {Blog} from '../../model/blog';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-root',
  templateUrl: './blog-root.component.html',
  styleUrls: ['./blog-root.component.css']
})
export class BlogRootComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log("ROOT", params) );

  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().then((res) => {
      res.forEach(blog => {
        console.log('BLOG', blog);
        this.blogs.push(blog);
      });
    });

  }

}
