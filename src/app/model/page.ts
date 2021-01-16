export class Page {
  parent: string;
  children: string[];
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

  addChild(childId: string): void {
    this.children.push(childId);
  }
  removeChild(childId: string): void {
    const index = this.children.indexOf(childId);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

}
