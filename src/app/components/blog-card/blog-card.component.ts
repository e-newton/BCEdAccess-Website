import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
