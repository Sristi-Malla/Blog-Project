import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Blog } from '../models/blog.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl:string = "http://localhost:3000/blogs/";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: any): Observable<Blog> {
    return this.http.get<Blog>(this.baseUrl+"/"+id).pipe(
      catchError(this.handleError)
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl+"/"+id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}?title_like=${title}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
