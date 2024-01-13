import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from '../service/ArticleService/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.css'
})
export class DeleteAlertComponent {

  activeModal = inject(NgbActiveModal);

  @Input() itemToDelete: string = "";
  @Input() articleID: number = 0;

  constructor(
    private service: ArticleService,
    private router: Router
  ) { }

  handleOkClick = () => {
    switch (this.itemToDelete) {
      case "article":
        this.deleteArticle()
        break;
    
      default:
        break;
    }
  }
  deleteArticle = () => {
    this.service.deleteArticle(this.articleID).subscribe(
      res => {
        this.activeModal.close();
        this.router.navigate(['/dashboard'])
      }
    )
  }

  ngOnInit() {
    console.log(this.itemToDelete);
    
  }
}
