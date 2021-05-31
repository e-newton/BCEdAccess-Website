import { Component, OnInit } from '@angular/core';
import {PageService, Node} from '../../../services/page.service';


@Component({
  selector: 'app-naviagation-menu',
  templateUrl: './naviagation-menu.component.html',
  styleUrls: ['./naviagation-menu.component.css']
})
export class NaviagationMenuComponent implements OnInit {

  tree: Node[];
  constructor(public ps: PageService) {
    this.ps.getTree().then((tree) => {
      this.tree = tree;
      console.log('tree', this.tree);
    });
  }

  ngOnInit(): void {
  }

}
