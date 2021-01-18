import { Component, OnInit } from '@angular/core';
import {PageService} from '../../services/page.service';
import {Page} from '../../model/page';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.css']
})
export class PageBaseComponent implements OnInit {

  currentPage: Page;
  id: string;
  loading = true;
  constructor(public ps: PageService, public router: Router, public activeRouter: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.urlUpdateStrategy = 'eager';

  }

  async ngOnInit(): Promise<void> {
    this.id = this.activeRouter.snapshot.params.id;
    try{
      this.currentPage = await this.ps.getPage(this.id);
    } catch (e) {
      console.error(e);
      await this.router.navigate(['']);
    }
    this.loading = false;
    console.log('Children', this.currentPage.children);

  }

}
