import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  id: number;
  title: string;
  author: string;
  html: string;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {
    this.route.params.subscribe( async params => {
      if (String(params.id).match(/[^0-9]/)){
        await this.router.navigate(['../'], {relativeTo: this.route});
      }
      this.id = params.id;
    });


  }

  ngOnInit(): void {
    this.blogService.getSingleBlog(String(this.id)).then((res) => {
      if (res.length > 0) {
        this.html = res[0].body;
        this.title = res[0].title;
        this.author = res[0].author;
      } else{
        this.router.navigate(['../'], {relativeTo: this.route});
       }
    });
  }


}
