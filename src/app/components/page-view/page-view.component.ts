import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../model/page';
import {PageService} from '../../services/page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageChild} from '../../model/page-child';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {

  @Input() currentPage: Page;
  id: string;
  loading = true;
  constructor(public ps: PageService, public router: Router, public activeRouter: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {


  }

  getDecodedLinks(): string[] {
    const rv = [];
    this.currentPage.children.forEach(child => {
      rv.push(decodeURIComponent(child.ref.replace('\\', '/')));
    });
    return rv;

  }

  getDecodedChildren(): PageChild[] {
    const rv = [];
    this.currentPage.children.forEach(child => {
      const sc = (child.ref.match(/\\/g) || []).length;
      let newRef = child.ref;
      for (let i = 0; i < sc; i++){
        newRef = newRef.replace('\\', '/');
      }
      rv.push(new PageChild(decodeURIComponent(newRef), child.title));
    });
    return rv;

  }



}
