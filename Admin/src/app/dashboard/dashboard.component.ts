import { Component, Sanitizer, inject } from '@angular/core';
import { Article } from '../model/Article';
import { ArticleService } from '../service/ArticleService/article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddArticleComponent } from '../add-article/add-article.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  articles?: Article[];
  private modalService = inject(NgbModal);


  constructor(
    private service: ArticleService, 
    private router: Router
  ) { }

  openAddArticleModal() {
		const modalRef = this.modalService.open(AddArticleComponent);
		// modalRef.componentInstance.name = 'World';
	}

  getImageUrl(image: string): string {
    const imageSrc = image.split('\\').pop();
    return `http://127.0.0.1:8080/${imageSrc}`
  }

  goToArticleDetails = (articleID:number) => {
    this.service.getArticleById(articleID).subscribe(
      article => {
        this.router.navigate([`articleDetails/${articleID}`])
        console.log(article);
        
      }
    )
  }

  ngOnInit(): void {
    this.service.getAllArticles().subscribe(
      (articles) => {
        this.articles = articles; // Ensure 'articles' is an array here
        console.log(articles);
      },
      (error: any) => {
        console.error('Error fetching articles:', error);
        // Handle error, e.g., show a message to the user
      }
    );

  }

}
