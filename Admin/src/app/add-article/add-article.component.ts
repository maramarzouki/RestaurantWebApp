import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from '../service/ArticleService/article.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})


export class AddArticleComponent {

  activeModal = inject(NgbActiveModal);
  selectedFile?: File

  article: { title: string, description: string, image?: File, price: number, category: string } = { title: '', description: '', price: 0, category: '' }


  constructor(
    private service: ArticleService
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createArticle = (f: NgForm) => {
    const newArticle = {
      title: f.value.title,
      description: f.value.description,
      image: this.selectedFile,
      price: f.value.price,
      category: f.value.category
    }
    console.log('Form Values:', f.value);

    console.log(newArticle);

    this.service.addArticle(newArticle).subscribe(
      res => {
        this.activeModal.close();
        window.location.reload();
      }
    );
  };

  // if (this.selectedFile) {
  //   reader.readAsDataURL(this.selectedFile);
  // }

}

