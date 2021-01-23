import {PageChild} from './page-child';

export class Page {
  parent: string;
  children: PageChild[];
  title: string;
  body: string;
  showChildren: boolean;
  id: string;

  constructor(parent: string, title: string, body: string, showChildren: boolean, id: string) {
    this.parent = parent;
    this.title = title;
    this.body = body;
    this.showChildren = showChildren;
    this.id = id;
    this.children = [];
  }

  addChild(child: PageChild): void {
    this.children.push(child);
  }
  removeChild(childId: string): void {
    let index = -1;
    this.children.forEach((obj, i) => {
      if (obj.ref === childId) {
        index = i;
      }
    });
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

}
