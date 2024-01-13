import { Component, inject } from '@angular/core';
import { ArticleService } from '../service/ArticleService/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateArticleComponent } from '../update-article/update-article.component';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {

  articleID: number = 0
  article = {title:'', description:'', image:'', price:0, category:''}
  private modalService = inject(NgbModal)

  constructor(
    private service: ArticleService,
    private route: ActivatedRoute
  ) { }


  openUpdateArticleModal() {
		const modalRef = this.modalService.open(UpdateArticleComponent);
		modalRef.componentInstance.articleID = this.articleID
	}

  openDeleteArticleModal() {
    const modalRef = this.modalService.open(DeleteAlertComponent);
    modalRef.componentInstance.itemToDelete = "article"
    modalRef.componentInstance.articleID = this.articleID
  }

  getImageUrl(image: string): string {
    const imageSrc = image.split('\\').pop();
    return `http://127.0.0.1:8080/${imageSrc}`
  }

  getArticleDetails(){
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
  ngOnInit() : void {
    this.route.params.subscribe(
      params => {
        this.articleID = params['articleID'];
      }
    )
    this.getArticleDetails();
  }
}
