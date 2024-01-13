import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from '../services/ArticleService/article.service';
import { OrderService } from '../services/OrderService/order.service';
import { NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css'
})
export class MakeOrderComponent {

  activeModal = inject(NgbActiveModal)
  @Input() articleID = 0

  order = { title: '', quantity: 0, address: '' } 
  titleValue = '';

  localStorageToken : any;
  token : any;
  customerID : string = '';


  constructor(
    private service: ArticleService,
    private orderService: OrderService
  ){}

  
  getArticleDetails() {
    this.service.getArticleById(this.articleID).subscribe(
      article => {
        this.titleValue = article.title
      }
    )
  }

  getCustomerID = () => {
    this.localStorageToken = localStorage.getItem('Token');
    this.token = jwtDecode(this.localStorageToken)
    this.customerID = this.token._id
    
  }

  makeOrder(f: NgForm){
    const newOrder = {
      title: this.titleValue,
      quantity: f.value.quantity,
      address: f.value.address,
      articleID: this.articleID,
      customerID: this.customerID
    }
    this.orderService.makeOrder(newOrder).subscribe(
      res => {
        this.activeModal.close()
        window.location.reload()
      }, err=>{
        console.log(newOrder);
        
      }
    )
  }

  ngOnInit() {
    this.getArticleDetails();
    this.getCustomerID()
  }

}
