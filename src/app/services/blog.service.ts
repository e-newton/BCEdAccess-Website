import { Injectable } from '@angular/core';
import {Blog} from '../model/blog';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FirebaseStorageImageCacheService} from './firebase-storage-image-cache.service';

interface BlogFSObject {
  date: Date;
  title: string;
  author: string;
  body: string;
  views: number;
  featured: boolean;
  draft: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs$: Observable<any[]>;

  // TODO: Turn this into an AngularFire app

  constructor(private http: HttpClient, private firestore: AngularFirestore, private fsic: FirebaseStorageImageCacheService) {
    this.blogs$ = firestore.collection('blogs').valueChanges();
  }


  async getAllBlogs(): Promise<any>{
    const snapshot = await this.firestore.collection('blogs').get().toPromise();
    const blogs = [];
    snapshot.forEach(doc => {
      const data = doc.data() as BlogFSObject;
      blogs.push(new Blog(Number(doc.id), data.title, data.author, data.body, data.views, data.draft, data.date, data.featured));
    });
    return blogs;

  }

  async getAllDraftBlogs(): Promise<any>{
    const snapshot = await this.firestore.collection('blogs').ref.where('draft', '==', true).orderBy('date', 'asc').get();
    const blogs = [];
    snapshot.forEach(doc => {
      const data = doc.data() as BlogFSObject;
      blogs.push(new Blog(Number(doc.id), data.title, data.author, data.body, data.views, data.draft, data.date, data.featured));
    });
    return blogs;
  }

  async getAllNonDraftBlogs(): Promise<any>{
    const snapshot = await this.firestore.collection('blogs').ref.where('draft', '==', false).orderBy('date', 'asc').get();
    const blogs = [];
    snapshot.forEach(doc => {
      const data = doc.data() as BlogFSObject;
      blogs.push(new Blog(Number(doc.id), data.title, data.author, data.body, data.views, data.draft, data.date, data.featured));
    });
    return blogs;
  }

  async getSingleBlog(id: string, addViews: boolean = false): Promise<any> {
    const snapshot = await this.firestore.collection('blogs').doc(id).get().toPromise();
    if (snapshot.exists){
      const doc = snapshot;
      const data = doc.data() as BlogFSObject;
      if (addViews){
        this.firestore.collection('blogs').doc(id).update({views: data.views + 1}).then(r => {});
      }
      return [new Blog(Number(doc.id), data.title, data.author, data.body, data.views, data.draft, data.date, data.featured)];
    } else {
      return [];
    }
  }

  async postBlog(blog: Blog): Promise<boolean> {
    return await this.firestore.collection('blogs').doc(String(blog.id)).set({
      title: blog.title,
      author: blog.author,
      body: blog.body,
      views: blog.views,
      date: blog.date,
      featured: blog.featured,
      draft: blog.draft,
    }).then((value => {
      return true;
    })).catch((err) => {
      return false;
    });
  }

  async isBlogIDValid(id: string): Promise<boolean> {
    return await this.firestore.collection('blogs').doc(id).get().toPromise().then((data) => {
      return !data.exists;
    });
  }

  async updateBlog(blog: Blog): Promise<boolean> {
    return await this.firestore.collection('blogs').doc(String(blog.id)).update({
      title: blog.title,
      author: blog.author,
      body: blog.body,
      views: blog.views,
      date: blog.date,
      featured: blog.featured,
      draft: blog.draft,
    }).then((value => {
      return true;
    })).catch((err) => {
      return false;
    });
  }

  async deleteBlog(id: string): Promise<boolean> {
    const rv = await this.firestore.collection('blogs').doc(id).delete().then(() => {
      return true;
    }).catch((err) => {
      return false;
    });
    if (rv) {
      await this.fsic.deleteBlogImageCache(id);
    }
    return rv;
  }

  async publishBlog(id: string): Promise<boolean> {
    return await this.firestore.collection('blogs').doc(id).update(
      {draft: false,
            date: new Date()}
    ).then(() => {
      return true;
    }).catch((err) => {
      return false;
    });
  }


}
