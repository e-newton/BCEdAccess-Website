import { Injectable } from '@angular/core';
import {Blog} from '../model/blog';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  async getAllBlogs(): Promise<any>{
    const response =  await this.http.get('/api/blogs').toPromise();
    return response;

  }

  async getSingleBlog(id: string): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    const response =  await this.http.get('/api/blogs/', {headers, params}).toPromise();
    return response;
  }

  async isBlogIDValid(id: string): Promise<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    const response: Blog[] =  await this.http.get('/api/blogs/', {headers, params}).toPromise() as Blog[];
    return response.length === 0;
  }


}
