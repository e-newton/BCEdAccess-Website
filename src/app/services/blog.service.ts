import { Injectable } from '@angular/core';
import {Blog} from '../model/blog';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs$: Observable<any[]>;

  // TODO: Turn this into an AngularFire app

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.blogs$ = firestore.collection('blogs').valueChanges();
  }


  async getAllBlogs(): Promise<any>{
    const snapshot = await this.firestore.collection('blogs').get().toPromise();
    const blogs = [];
    snapshot.forEach(doc => {
      blogs.push(new Blog(Number(doc.id), doc.data().title, doc.data().author, doc.data().body));
    });
    return blogs;

  }

  async getSingleBlog(id: string): Promise<any> {
    const snapshot = await this.firestore.collection('blogs').doc(id).get().toPromise();
    if (snapshot.exists){
      const doc = snapshot;
      return [new Blog(Number(doc.id), doc.data().title, doc.data().author, doc.data().body)];
    } else {
      return [];
    }
  }

  async postBlog(blog: Blog): Promise<boolean> {
    return await this.firestore.collection('blogs').doc(String(blog.id)).set({
      title: blog.title,
      author: blog.author,
      body: blog.body,
    }).then((value => {
      return true;
    })).catch((err) => {
      return false;
    });
  }

  async isBlogIDValid(id: string): Promise<boolean> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', id);
    // const response: Blog[] =  await this.http.get('/api/blogs/', {headers, params}).toPromise() as Blog[];
    // return response.length === 0;
    return true;
  }

  async updateBlog(blog: Blog): Promise<boolean> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', String(blog.id));
    // const response: any = await this.http.put<Blog>('/api/blogs/', blog, {headers, params}).toPromise();
    // return response.success as boolean;
    return true;
  }

  async deleteBlog(id: string): Promise<boolean> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', id);
    // const response: any =  await this.http.delete<Blog>('/api/blogs/', {headers, params}).toPromise();
    // return response.success as boolean;
    return true;
  }


}
