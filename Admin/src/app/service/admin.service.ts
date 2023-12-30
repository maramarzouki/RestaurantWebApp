import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/Admin';
import { Article } from '../model/Article';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL = 'http://localhost:3001';


  constructor(private http: HttpClient) { }

  loginAdmin = (loginCreds: object): Observable<Admin> => {
    const options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };

    return (this.http.post<Admin>(
      `${this.baseURL}/loginAdmin`,
      loginCreds,
      options
    ))
  }

  getAllArticles = (): Observable<Article[]> => {
    return this.http.get<Article[]>(`${this.baseURL}/getAllArticles`)
  }

  addArticle = (artcile: Object): Observable<Article> => {
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };

    return (this.http.post<Article>(
      `${this.baseURL}/createArticle`,
      artcile,
      options
    ))
  }
}
