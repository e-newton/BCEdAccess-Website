import { Injectable } from '@angular/core';
import {Blog} from '../model/blog';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  async getAllBlogs(): Promise<any>{
    const data = {type: 'ALL'};
    const response =  await this.http.get('/api/blogs').toPromise();
    return response;

  }


}
