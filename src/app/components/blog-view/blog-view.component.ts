import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  id: number;
  html: string;
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.route.params.subscribe( params => {
      this.id = params.id;
      blogService.getSingleBlog(String(this.id));
    });


  }

  ngOnInit(): void {
  }


}
