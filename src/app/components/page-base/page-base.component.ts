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
    this.id = this.router.url;
    while (this.id.includes('/')) {
      this.id = this.id.replace('/', '\\');
    }
    this.id = this.id.substring(1, this.id.length);
    try{
      this.currentPage = await this.ps.getPage(this.id);
    } catch (e) {
      console.error(e);
      await this.router.navigate(['']);
    }
    this.loading = false;

  }

  deletePage(): void {
    console.log('DELETE PAGE');
    this.ps.deletePage(this.currentPage.id, false).then(() => {
      void this.router.navigate(['']);
    });
  }

  moveToRoot(pageID): void {
    void this.ps.changeParent(pageID, '');
  }

  addTestPage(): void {
    const parentPage = new Page('', 'Test', '<h1>Test</h1>', true, 'test');
    const child1Page = new Page('test', 'Child 1', '<h1>Child 1</h1>', true, 'test\\c1');
    const child2Page = new Page('test\\c1', 'Child 2', '<h1>Child 22</h1>', true, 'test\\c1\\c2');
    const child3Page = new Page('test\\c1\\c2', 'Sub Child 3', '<h1>child 3</h1>', true, 'test\\c1\\c2\\c3');
    const child4Page = new Page('test\\c1\\c2', 'Sub Child 4', '<h1>child 4</h1>', true, 'test\\c1\\c2\\c4');
    parentPage.addChild(new PageChild('test\\c1', 'Child 1'));
    child1Page.addChild(new PageChild('test\\c1\\c2', 'Child 2'));
    child2Page.addChild(new PageChild(child3Page.id, child3Page.title));
    child2Page.addChild(new PageChild(child4Page.id, child4Page.title));
    console.log('adding test pages');
    void this.ps.savePage(parentPage);
    void this.ps.savePage(child1Page);
    void this.ps.savePage(child2Page);
    void this.ps.savePage(child3Page);
    void this.ps.savePage(child4Page);

  }

  moveToTest(id: string): void {
    void this.ps.changeParent(id, 'test');
  }
}
