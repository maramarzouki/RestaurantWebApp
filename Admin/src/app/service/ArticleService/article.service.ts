import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseURL = 'http://localhost:3001'

  constructor(private http: HttpClient) { }

  getAllArticles = (): Observable<Article[]> => {
    return this.http.get<Article[]>(`${this.baseURL}/getAllArticles`)
  }

  addArticle = (article: any): Observable<Article> => {
    console.log(article.image);
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('price', article.price);
    formData.append('category', article.category);

    formData.append('file', article.image, article.image.name);
    console.log("article.image", article.image);
    console.log("article.image.name", article.image.name);
    const options = {
      headers: new HttpHeaders()
    };

    return this.http.post<Article>(
      `${this.baseURL}/createArticle`,
      formData,
      options
    );
  }

  getArticleById = (articleID: number): Observable<Article> => {
    return this.http.get<Article>(`${this.baseURL}/getArticleDetails/${articleID}`)
  }

  // editArticle = (article: any, articleID: any) : Observable<Article> => {
  //   console.log("ARTICLE",article);

  //   const options = {
  //     headers : new HttpHeaders()
  //   };

  //   const formData = new FormData();
  //   formData.append('title', article.title);
  //   formData.append('description', article.description);
  //   formData.append('price', article.price);
  //   formData.append('category', article.category);

  //   // formData.append('file', article.image, article.image.name);

  //   if (article.image != null) {
  //     formData.append('image', article.image, article.image.name);
  //   } 

  //   console.log(formData);

  //   return this.http.put<Article>(
  //     `${this.baseURL}/updateArticle/${articleID}`,
  //     formData,
  //     options
  //   )
  // }


  editArticle(article: any, articleID: any): Observable<Article> {
    console.log("Object length",Object.keys(article).length);
    
    if ((Object.keys(article).length) == 4) {
      const options = {
        headers: new HttpHeaders({ 'content-type': 'application/json' })
      };
      return this.http.put<Article>(
        `${this.baseURL}/updateArticle/${articleID}`,
        article,
        options
      );
    } else {
      const options = {
        headers: new HttpHeaders()
      };

      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('description', article.description);
      formData.append('price', article.price);
      formData.append('category', article.category);
  
      formData.append('file', article.image, article.image.name);
      console.log("article.image", article.image);
      console.log("article.image.name", article.image.name);
      
      return this.http.put<Article>(
        `${this.baseURL}/updateArticle/${articleID}`,
        formData,
        options
      );
    }
  }

  deleteArticle(articleID: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/deleteArticle/${articleID}`)
  }
}
