import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirebaseStorageImageCacheService} from './firebase-storage-image-cache.service';
import {Page} from '../model/page';


interface FireStorePage {
  parent: string;
  children: AngularFirestoreCollection;
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

  public async savePage(page: Page): Promise<void> {
    const snapshot = this.firestore.collection('pages');
    await snapshot.doc(page.id).set({
      body: page.body,
      title: page.title,
      parent: page.parent,
      showChildren: page.showChildren
    });
    const childrenCollection = snapshot.doc(page.id).collection('children');
    for (const child of page.children) {
      await childrenCollection.doc().set({ref: child});
    }

  }

  public async getPage(pageId: string): Promise<Page> {
    const snapshot = this.firestore.collection('pages').doc(pageId);
    const docData = await snapshot.get().toPromise();
    const pageData = docData.data() as FireStorePage;
    const page: Page = new Page(pageData.parent, pageData.title, pageData.body, pageData.showChildren, docData.id);
    const children = await pageData.children.get().toPromise();
    for (const child of children.docs){
      const childID = await child.get('ref') as string;
      page.addChild(childID);
    }
    return page;
  }
}
