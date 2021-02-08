import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ITreeOptions, ITreeState} from '@circlon/angular-tree-component';
import { v4 } from 'uuid';
import {PageService} from '../../services/page.service';

interface Node {
  id: string;
  children: Node[];
}

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss', './page-tree.component.css', '../../../../node_modules/@circlon/angular-tree-component/css/angular-tree-component.css']
})
export class PageTreeComponent {

  state: ITreeState = {
    expandedNodeIds: {},
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  options: ITreeOptions = {
    allowDrag: (node) => true,
    getNodeClone: (node) => ({
      ...node.data,
      id: v4(),
      name: `copy of ${node.data.name}`
    }),
    animateExpand: true,
  };

  nodes = [];
  ids = [];
  loading = true;
  constructor(private ps: PageService) {
    this.ps.getTree().then((tree) => {
      this.nodes = tree;
      this.loading = false;
    });
    this.ps.getAllPageIds().then(ids => {
      this.ids = ids;
    });
  }
  async onMoveNode($event): Promise<void> {
    this.loading = true;
    const parent = (this.ids.includes($event.to.parent.id)) ? $event.to.parent.id : '';
    console.log(
      'Moved',
      $event.node.id,
      'to',
      parent);
    const page = await this.ps.getPage($event.node.id);
    if (page.parent === parent) {
      this.loading = false;
      return;
    }
    await this.ps.changeParent($event.node.id, parent);
    this.nodes = await this.ps.getTree();
    this.ids = await this.ps.getAllPageIds();
    this.loading = false;
  }

  print(event: any) {
    console.log('AH');
  }


}
