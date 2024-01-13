import { Component, inject } from '@angular/core';
import { ArticleService } from '../services/ArticleService/article.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/AuthService/authentication-service.service';
import { MakeOrderComponent } from '../make-order/make-order.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {

  articleID: number = 0
  article = { title: '', description: '', image: '', price: 0, category: '' }
  authenticated: boolean | undefined;
  private ModalService = inject(NgbModal)


  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { 
    this.authenticated = this.authService.isAuthenticated()
  }

  openLoginModal(){
    console.log(this.authenticated);
    
    if(!this.authenticated){
      const modal = this.ModalService.open(MakeOrderComponent)
      modal.componentInstance.articleID = this.articleID
    }else{
      this.ModalService.open(LoginComponent)
    }
  }

  getImageUrl(image: string): string {
    const imageSrc = image.split('\\').pop();
    return `http://127.0.0.1:8080/${imageSrc}`
  }

  getArticleDetails() {
    this.service.getArticleById(this.articleID).subscribe(
      article => {
        this.article.title = article.title;
        this.article.description = article.description;
        this.article.image = article.image;
        this.article.price = article.price;
        this.article.category = article.category
        console.log(article.title);
      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.articleID = params['articleID'];
      }
    )
    this.getArticleDetails();
  }
}
