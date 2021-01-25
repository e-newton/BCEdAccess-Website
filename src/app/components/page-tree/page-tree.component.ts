import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ITreeOptions, ITreeState} from '@circlon/angular-tree-component';
import { v4 } from 'uuid';

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
    })
  };

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      id: 'BOOP BAH BOOP',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
            {name: 'grandchild2.2.1'}
          ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];
  onMoveNode($event): void {
    console.log(
      'Moved',
      $event.node.id,
      'to',
      $event.to.parent.id);
  }


}
