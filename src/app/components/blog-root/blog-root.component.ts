import { Component, OnInit } from '@angular/core';
import {Blog} from '../../model/blog';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-root',
  templateUrl: './blog-root.component.html',
  styleUrls: ['./blog-root.component.css']
})
export class BlogRootComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(public blogService: BlogService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => console.log('ROOT', params) );
  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().then((res) => {
      res.forEach(blog => {
        this.blogs.push(blog);
      });
    });

  }
  deleteBlog(id: number): void {
    let b: Blog;
    this.blogs.forEach((blog) => {
      if (blog.id === id){
        b = blog;
        return;
      }
    });
    if (b) {
      this.blogs.splice(this.blogs.indexOf(b), 1);
      this.blogService.deleteBlog(String(id)).then(() => {
      });
    }

  }



}
