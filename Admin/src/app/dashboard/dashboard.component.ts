import { Component, Sanitizer, inject } from '@angular/core';
import { Article } from '../model/Article';
import { AdminService } from '../service/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddArticleComponent } from '../add-article/add-article.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  articles?: Article[];
  private modalService = inject(NgbModal);


  constructor(
    private service: AdminService,
    private sanitizer: DomSanitizer
  ) { }

  openAddArticleModal() {
		const modalRef = this.modalService.open(AddArticleComponent);
		// modalRef.componentInstance.name = 'World';
	}

  // displayImage(image: any): string {
  //     const base64String = btoa(String.fromCharCode(...new Uint8Array(image.data)));
  //     return `data:${image.contentType};base64,${base64String}`;
  // }

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
