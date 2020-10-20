import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  id: number;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.id = params.id);
  }

  ngOnInit(): void {
  }


}
