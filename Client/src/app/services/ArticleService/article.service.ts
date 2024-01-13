import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseURL = 'http://localhost:3001'

  constructor(
    private http: HttpClient
  ) { }

  getArticlesByCategory = (category: string): Observable<Article[]> => {
    return this.http.get<Article[]>(`${this.baseURL}/getArticlesByCategory/${category}`)
  }

  getArticleById = (articleID: number): Observable<Article> => {
    return this.http.get<Article>(`${this.baseURL}/getArticleDetails/${articleID}`)
  }
}
