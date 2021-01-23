import { Component, OnInit } from '@angular/core';
import {PageService} from '../../services/page.service';
import {Page} from '../../model/page';
import {ActivatedRoute, Router} from '@angular/router';
import {PageChild} from '../../model/page-child';

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
    this.id = '';
    this.activeRouter.snapshot.children.forEach(c => {
      c.url.forEach(url => {
        this.id += url.path + '\\';
      });
    });
    this.id = this.id.substring(0, this.id.length - 1);
    console.log(this.activeRouter);
    console.log('id', this.id);
    try{
      this.currentPage = await this.ps.getPage(this.id);
    } catch (e) {
      console.error(e);
      await this.router.navigate(['']);
    }
    this.loading = false;
    console.log('Children', this.currentPage.children);

  }

  deletePage(): void {
    console.log('DELETE PAGE');
    this.ps.deletePage(this.currentPage.id, false).then(() => {
      void this.router.navigate(['']);
    });
  }

  addTestPage(): void {
    const parentPage = new Page('', 'Test', '<h1>Test</h1>', true, 'test');
    const child1Page = new Page('test', 'Child 1', '<h1>Child 1</h1>', true, 'test\\c1');
    const child2Page = new Page('test\\c1', 'Child 2', '<h1>Child 22</h1>', true, 'test\\c1\\c2');
    parentPage.addChild(new PageChild('test\\c1', 'Child 1'));
    child1Page.addChild(new PageChild('test\\c1\\c2', 'Child 2'));
    console.log('adding test pages');
    void this.ps.savePage(parentPage);
    void this.ps.savePage(child1Page);
    void this.ps.savePage(child2Page);

  }

}
