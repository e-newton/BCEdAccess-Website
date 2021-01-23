import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirebaseStorageImageCacheService} from './firebase-storage-image-cache.service';
import {Page} from '../model/page';
import {PageChild} from '../model/page-child';
import {root} from 'rxjs/internal-compatibility';


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
    console.log('Saved Page', page.id);
  }

  public async getAllPageIds(): Promise<string[]> {
    const rv = [];
    const docs = await this.firestore.collection('pages').get().toPromise();
    docs.forEach(doc => {
      rv.push(doc.id);
    });
    return rv;

  }

  public async deletePage(pageId: string, aggressive = false): Promise<void> {
    if (aggressive) {
      console.log('WE AGGRESSIVE BOY');
      await this.aggressiveDeletePage(pageId);
    } else {
      console.log('we chill');
      await this.mergeDeletePage(pageId);
    }

  }

  private async mergeDeletePage(pageId: string): Promise<void> {
    const rootPage = await this.getPage(pageId);
    const parentID = rootPage.parent;
    if (!parentID) {
      await this.firestore.collection('pages').doc(pageId).delete();
      return;
    }
    const parentPage = await this.getPage(parentID);
    const snapshot = this.firestore.collection('pages').doc(pageId);
    const docData = await snapshot.get().toPromise();
    const pageData = docData.data() as FireStorePage;
    if (pageData.children){
      for (const i of Object.values<any>(pageData.children)) {
        parentPage.addChild(i);
      }
    }
    parentPage.removeChild(pageId);
    await this.savePage(parentPage);
    const parentDocData = await this.firestore.collection('pages').doc(pageId).get().toPromise();
    const parentPageData = parentDocData.data() as FireStorePage;
    if (parentPageData.children) {
      for (const i of Object.values<any>(parentPageData.children)) {
        await this.firestore.collection('pages').doc(i.ref).update({parent: parentID});
      }
    }
    await this.firestore.collection('pages').doc(pageId).delete();
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
