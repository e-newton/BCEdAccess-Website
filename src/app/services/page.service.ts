import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirebaseStorageImageCacheService} from './firebase-storage-image-cache.service';
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

@Injectable({
  providedIn: 'root'
})

export class PageService {


  constructor(private http: HttpClient, private firestore: AngularFirestore, private fsic: FirebaseStorageImageCacheService) { }

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

  public async getAllPageIds(): Promise<string[]> {
    const rv = [];
    const docs = await this.firestore.collection('pages').get().toPromise();
    docs.forEach(doc => {
      rv.push(doc.id);
    });
    return rv;
  }

  // Deletes a page from the database
  // param: aggressive --> if true, will delete the page and all children
  //                       if false (default), will delete the page and the parent will inherit the children.
  public async deletePage(pageId: string, aggressive = false): Promise<void> {
    aggressive ? await this.aggressiveDeletePage(pageId) : await this.mergeDeletePage(pageId);
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
      await this.changeParentsOfDeletedPageChildren(parentPageData, parentID);
    }
    await this.firestore.collection('pages').doc(pageId).delete();
  }

  private async changeParentsOfDeletedPageChildren(parentPageData: FireStorePage, parentID: string): Promise<void> {
    for (const i of Object.values<any>(parentPageData.children)) {
      // Change Parents of children of deleted page
      const childDocData = await this.firestore.collection('pages').doc(i.ref).get().toPromise();
      const childData = childDocData.data() as FireStorePage;
      const newID = parentID + childDocData.id.replace(childData.parent, '');
      childData.parent = parentID;
      await this.firestore.collection('pages').doc(newID).set(childData);
      console.log('Child should be changed', newID, i.ref);
      await this.firestore.collection('pages').doc(i.ref).delete();
    }
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
      throw new Error('This page does not exist');
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
