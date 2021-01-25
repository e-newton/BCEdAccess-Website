import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

interface Node {
  id: string;
  children: Node[];
}

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.css']
})
export class PageTreeComponent implements OnInit {



  root: Node[] = [
    {
      id: 'item 1',
      children: []
    },
    {
      id: 'item 2',
      children: [
        {id: 'item 69',
        children: [
          {id: 'item 72',
            children: []}
        ]},
      ]
    },
    {
      id: 'item 3',
      children: []
    },
  ];

  allIDs = [];
  nodeLookup = {};
  constructor() {
    this.prepare(this.root);
    console.log(this.allIDs);
  }

  private prepare(nodes: Node[]): void{
    nodes.forEach((node) => {
      this.allIDs.push(node.id);
      this.nodeLookup[node.id] = node;
      this.prepare(node.children);
    });
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Node[]>): void {
    console.log('Drop Event', event);
    moveItemInArray(this.root, event.previousIndex, event.currentIndex);
  }

}
