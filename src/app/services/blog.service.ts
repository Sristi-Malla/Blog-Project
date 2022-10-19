import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl:string = "http://localhost:3000/blogs/";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl);
  }

  get(id: any): Observable<Blog> {
    return this.http.get<Blog>(this.baseUrl+"/"+id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl+"/"+id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}?title=${title}`);
  }
}
