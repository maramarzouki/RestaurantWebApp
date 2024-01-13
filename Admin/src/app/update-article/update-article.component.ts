import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from '../service/ArticleService/article.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultValueAccessor, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.css'
})
export class UpdateArticleComponent {

  activeModal = inject(NgbActiveModal);

  @Input() articleID: number = 0;

  article: { title: string, description: string, image?: string, price: number, category: string } = { title: '', description: '', price: 0, category: '' }
  // articleID: number = 0
  selectedFile?: File;
  myForm!: FormGroup
  titleValue: string = '';
  descriptionValue: string = '';
  priceValue: number = 0;
  categoryValue: string = '';


  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) { }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getArticleDetails() {
    this.service.getArticleById(this.articleID).subscribe(
      article => {
        this.article.title = article.title;
        this.article.description = article.description;
        this.article.price = article.price;
        this.article.category = article.category

        this.titleValue = this.article.title
        console.log('titleValue', this.titleValue);
        this.descriptionValue = this.article.description
        console.log('descriptionValue:', this.descriptionValue);
        this.priceValue = this.article.price
        console.log('priceValue', this.priceValue);
        this.categoryValue = this.article.category
        console.log('categoryValue:', this.categoryValue);
      }
    )
  }

  // updateArticle() {
  //   const updatedArticle = {
  //     title: this.myForm.value.title,
  //     description: this.myForm.value.description,
  //     image: this.selectedFile,
  //     price: this.myForm.value.price,
  //     category: this.myForm.value.category
  //   };

  //   console.log('Form Values:', this.myForm.value);
  //   console.log(updatedArticle);

  //   this.service.editArticle(updatedArticle, this.articleID).subscribe(
  //     res => alert("Article updated successfully!")
  //   );
  // }

  ngOnInit() {
    this.getArticleDetails();
    console.log(this.articleID);

    // this.myForm = this.formBuilder.group({
    //   title: [''],
    //   description:[''],
    //   price: [0],
    //   category: ['']
    // });
    // this.myForm.get('description')?.setValue(this.article.description);

  }

  updateArticle = (f: NgForm) => {
    if (typeof (this.selectedFile) != "undefined") {
      console.log("selected file", this.selectedFile);

      const updatedArticle = {
        title: f.value.title,
        description: f.value.description,
        image: this.selectedFile,
        price: f.value.price,
        category: f.value.category
      }
      this.service.editArticle(updatedArticle, this.articleID).subscribe(
        res => {
          this.activeModal.close();
          window.location.reload();
        }
      )
      console.log(updatedArticle);

    } else {
      const updatedArticle = {
        title: f.value.title,
        description: f.value.description,
        price: f.value.price,
        category: f.value.category
      }
      this.service.editArticle(updatedArticle, this.articleID).subscribe(
        res => {
          this.activeModal.close();
          window.location.reload();
        }
      )
    }



  }

  // ngOnInit = (): void => {
  //   this.getArticleDetails();
  //   alert(this.article)
  //   console.log(this.article);    

  // }
}
