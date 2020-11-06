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
    // const response =  await this.http.get('/api/blogs/').toPromise();
    // return response;
    return [new Blog(69, 'Stub Blog', 'Stubby', '<h1>Hi I shouldn\'t exist for much longer</h1>')];

  }

  async getSingleBlog(id: string): Promise<any> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', id);
    // const response =  await this.http.get('/api/blogs/', {headers, params}).toPromise();
    // return response;
    return [new Blog(69, 'Stub Blog', 'Stubby', '<h1>Hi I shouldn\'t exist for much longer</h1>')];

  }

  async postBlog(blog: Blog): Promise<boolean> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', String(blog.id));
    // const response: any = await this.http.post<Blog>('/api/blogs/', blog, {headers, params}).toPromise();
    // return response.success as boolean;
    return true;

    // const response =  await this.http.get('/api/blogs/', {headers, params}).toPromise();
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
