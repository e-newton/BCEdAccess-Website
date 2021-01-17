import { Component, OnInit } from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.css']
})
export class PageBaseComponent implements OnInit {

  constructor(public ps: PageService) {
    this.ps.getPage('pages/root').then((page) => {
      console.log('page', page);
      page.children.forEach(child => {
        this.ps.getPage(child).then(childPage => {
          console.log('CHILD PAGE', childPage);
        });
      });
    });
  }

  ngOnInit(): void {
  }

}
