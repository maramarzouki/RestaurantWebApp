import { Component, Input } from '@angular/core';
import { ArticleService } from '../services/ArticleService/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/Article';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/AuthService/authentication-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  cateogry: string = ''
  articles?: Article[]

  authenticated: boolean;
 
  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authenticated = this.authService.isAuthenticated();
  }



  setCategory = () => {
    this.route.params.subscribe(
      params => {
        this.cateogry = params['category']
        console.log(params);
        this.getArticlesByCategory()
      }
    );

  }

  getImageUrl(image: string): string {
    const imageSrc = image.split('\\').pop();
    return `http://127.0.0.1:8080/${imageSrc}`
  }

  goToArticleDetails = (articleID: number) => {
    this.service.getArticleById(articleID).subscribe(
      article => {
        this.router.navigate([`articleDetails/${articleID}`])
        console.log(article);

      }
    )
  }

  getArticlesByCategory = () => {
    console.log("cat", this.cateogry);

    this.service.getArticlesByCategory(this.cateogry).subscribe(
      articles => {
        this.articles = articles
        console.log(articles);
        console.log(this.cateogry);

      }
    )
  }

  ngOnInit() {
    this.setCategory()
  }
}
