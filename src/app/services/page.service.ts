import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Page} from '../model/page';
import {PageChild} from '../model/page-child';


interface FireStorePage {
  parent: string;
  children: any;
  title: string;
  body: string;
  showChildren: boolean;
  id: string;
}
interface FireStoreChild {
  ref: string;
}
interface Node{
  name: string;
  id: string;
  children?: Node[];
}

@Injectable({
  providedIn: 'root'
})

export class PageService {


  constructor(private firestore: AngularFirestore) { }

  private static randomNumber(): number{
    return Math.floor(Math.random() * 100000);
  }

  public async savePage(page: Page): Promise<void> {
    await this.firestore.collection('pages').doc(page.id).set({
      body: page.body,
      title: page.title,
      parent: page.parent,
      children: this.generateChildrenObject(page),
      showChildren: page.showChildren,
    });
  }


  public async getTree(): Promise<Node[]> {
    const nodes: Node[] = [];
    const roots = await this.getRoots();

    const getChildren = async (id: string): Promise<Node> => {
      const page = await this.getPage(id);
      const node: Node = {id: page.id, name: page.title};
      if (page.children){
        node.children = [];
        for (const child of page.children) {
          node.children.push(await getChildren(child.ref));
        }
      }
      return node;
    };

    for (const root of roots) {
      nodes.push(await getChildren(root));
    }


    return nodes;

  }

  private async getRoots(): Promise<string[]> {
    const rv = [];
    const ids = await this.getAllPageIds();
    ids.forEach(id => {
      if (!id.includes('\\')) {
        rv.push(id);
      }
    });
    return rv;
  }

  public async getAllPageIds(): Promise<string[]> {
    const rv = [];
    const docs = await this.firestore.collection('pages').get().toPromise();
    docs.forEach(doc => {
      rv.push(doc.id);
    });
    return rv;
  }

  public async changeParent(pageID, newParentID): Promise<void> {
    // Change the current page's parent field
    const currentPage = await this.getPage(pageID);
    let newID = newParentID + '\\' + currentPage.id.replace(currentPage.parent, '');
    console.log('IDs', newID, newParentID, currentPage.parent);
    while (newID?.startsWith('\\')) {
      newID = newID.substr(1);
    }
    while (newID?.includes('\\\\')){
      newID = newID.replace('\\\\', '\\');
    }
    console.log('new id 1', newID);
    // Change Current Page's Parent Field
    const oldParent = currentPage.parent;
    currentPage.parent = newParentID;
    currentPage.id = newID;
    console.log(`Saving 1: ${currentPage.id}`);
    await this.savePage(currentPage);
    // Delete Page from Old Parent's Children
    if (oldParent) {
      const oldParentPage = await this.getPage(oldParent);
      oldParentPage.removeChild(pageID);
      await this.savePage(oldParentPage);
    }
    // Update new parent with new child
    if (newParentID) {
      const newParentPage = await this.getPage(newParentID);
      newParentPage.addChild(new PageChild(newID, currentPage.title));
      await this.savePage(newParentPage);
    }
    if (currentPage.children) {
      // update all children
      for (const child of currentPage.children) {
        await this.changeParent(child.ref, newID);
        let newChildID = newID + child.ref.replace(pageID, '');

        if (newChildID?.startsWith('\\')) {
          newChildID = newChildID.substr(1);
        }
        console.log('new id 2', newChildID);
        child.ref = newChildID;
      }
      // await this.savePage(currentPage);
    }
    console.log(`Saving 2: ${currentPage.id}`);
    await this.savePage(currentPage);
    console.log(`Deleting: ${pageID}`);
    await this.firestore.collection('pages').doc(pageID).delete();

  }

  // Deletes a page from the database
  // param: aggressive --> if true, will delete the page and all children
  //                       if false (default), will delete the page and the parent will inherit the children.
  public async deletePage(pageId: string, aggressive = false): Promise<void> {
    aggressive ? await this.aggressiveDeletePage(pageId) : await this.mergeDeletePage(pageId);
  }

  public async changeID(oldID: string, newID: string): Promise<void> {
    const page: Page = await this.getPage(oldID);
    const children = page.children;
    page.id = newID;
    page.children = [];
    await this.savePage(page);
    children?.forEach((child) => {
      this.changeParent(child.ref, newID);
    });
    if (page.parent) {
      const parent = await this.getPage(page.parent);
      parent.addChild(new PageChild(newID, page.title));
      parent.removeChild(oldID);
      await this.savePage(parent);
    }
    await this.deletePage(oldID, true);
  }

  private async mergeDeletePage(pageId: string): Promise<void> {
    const rootPage = await this.getPage(pageId);
    const parentID = rootPage.parent;
    const snapshot = this.firestore.collection('pages').doc(pageId);
    const docData = await snapshot.get().toPromise();
    const pageData = docData.data() as FireStorePage;
    // If this page has no parent, then we change all children to root pages
    if (!parentID) {
      if (pageData.children){
        await this.turnDeletedPageChildrenToRootPages(pageData);
      }
      await this.firestore.collection('pages').doc(pageId).delete();
      return;
    }
    // This page has a parent, so we need to change all of its children to have its parent.
    // As well, we need to add all children to the parent
    const parentPage = await this.getPage(parentID);
    if (pageData.children){
      for (const i of Object.values<PageChild>(pageData.children)) {
        const newID = parentID + i.ref.replace(pageId, '');
        parentPage.addChild(new PageChild(newID, i.title));
      }
    }
    parentPage.removeChild(pageId);
    await this.savePage(parentPage);
    const parentDocData = await this.firestore.collection('pages').doc(pageId).get().toPromise();
    const parentPageData = parentDocData.data() as FireStorePage;
    if (parentPageData.children) {
      for (const i of Object.values<any>(parentPageData.children)) {
        // Change Parents of children of deleted page
        await this.changeParent(i.ref, parentID);
      }
    }
    await this.firestore.collection('pages').doc(pageId).delete();
  }
  private async turnDeletedPageChildrenToRootPages(pageData: FireStorePage): Promise<void> {
    for (const i of Object.values<any>(pageData.children)) {
      const childDocData = await this.firestore.collection('pages').doc(i.ref).get().toPromise();
      const childData = childDocData.data() as FireStorePage;
      const newID = childDocData.id.replace(childData.parent, '');
      childData.parent = '';
      await this.firestore.collection('pages').doc(newID).set(childData);
      console.log('Child should be changed', newID, i.ref);
      await this.firestore.collection('pages').doc(i.ref).delete();
    }
  }

  private async aggressiveDeletePage(pageId: string): Promise<void>{
    const rootPage = await this.getPage(pageId);
    const parentID = rootPage.parent;
    const recursiveDelete = async (id) => {
      const snapshot = this.firestore.collection('pages').doc(id);
      const docData = await snapshot.get().toPromise();
      const pageData = docData.data() as FireStorePage;
      if (pageData.children){
        for (const i of Object.values<any>(pageData.children)) {
          await recursiveDelete(i.ref);
        }
      }
      await snapshot.delete();
    };
    await recursiveDelete(rootPage.id);
    if (parentID) {
      await this.removeChildFromParent(parentID, pageId);
    }
  }

  private async removeChildFromParent(parentID: string, childID: string): Promise<void> {
    const parentPage = await this.getPage(parentID);
    let index = -1;
    parentPage.children.forEach((obj, i) => {
      if (obj.ref === childID) {
        index = i;
      }
    });
    if (index > -1) {
      parentPage.children.splice(index, 1);
    }
    await this.savePage(parentPage);
  }

  private generateChildrenObject(page: Page): any {
    const rv: any = {};
    page.children.forEach((child) => {
      let id = String(PageService.randomNumber());
      while (Object.keys(rv).includes(id)){
        id = String(PageService.randomNumber());
      }
      rv[String(id)] = {ref: child.ref, title: child.title};
    });
    console.log(rv);
    return rv;
  }

  // Retrieves the page data and places it into a Page object
  public async getPage(pageId: string): Promise<Page> {
    const snapshot = this.firestore.collection('pages').doc(pageId);
    const docData = await snapshot.get().toPromise();
    if (!docData.exists){
      throw new Error(`This page does not exist: ${pageId}`);
    }
    const pageData = docData.data() as FireStorePage;
    const page: Page = new Page(pageData.parent, pageData.title, pageData.body, pageData.showChildren, docData.id);
    console.log('PAGE DATA', pageData);
    if (pageData.children){
      for (const i of Object.values<any>(pageData.children)) {
        page.addChild(new PageChild(decodeURI(i.ref), i.title));
      }
    }
    return page;
  }
}
