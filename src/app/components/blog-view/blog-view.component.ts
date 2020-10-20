import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  id: number;
  html: string;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {
    this.route.params.subscribe( async params => {
      this.id = params.id;
    });


  }

  ngOnInit(): void {
    this.blogService.getSingleBlog(String(this.id)).then((res) => {
      if (res.length > 0) {
        this.html = res[0].body;
      } else{
        this.router.navigate(['../'] , { relativeTo: this.route });
      }
    });
  }


}
