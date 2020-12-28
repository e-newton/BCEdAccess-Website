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

  ngOnInit(): void {
  }

}
