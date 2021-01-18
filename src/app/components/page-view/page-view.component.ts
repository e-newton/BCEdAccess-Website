import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../model/page';
import {PageService} from '../../services/page.service';
import {ActivatedRoute, Router} from '@angular/router';

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

}
