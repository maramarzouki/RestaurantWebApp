import { Component } from '@angular/core';
import { OrderService } from '../services/OrderService/order.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders? : [];
  localStorageToken : any;
  token : any;
  customerID : string = '';

  constructor(
    private service: OrderService
  ){

  }

  getCustomerID = () => {
    this.localStorageToken = localStorage.getItem('Token');
    this.token = jwtDecode(this.localStorageToken)
    this.customerID = this.token._id
    
  }

  getImageUrl(image: string): string {
    const imageSrc = image.split('\\').pop();
    return `http://127.0.0.1:8080/${imageSrc}`
  }

  getOrders(){
    this.service.getCustomerOrders(this.customerID).subscribe(
      orders => {
        this.orders = orders;

      }
    )
  }

  ngOnInit() {
    this.getCustomerID()
  }
}
