import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL = 'http://localhost:3001';


  constructor(private http: HttpClient) { }

  makeOrder = (object: object): Observable<any> => {
    const options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };

    return (this.http.post<any>(
      `${this.baseURL}/createOrder`,
      object,
      options
    ))
  }

  getCustomerOrders (customerID: any) : Observable<any> {
    return (this.http.get<any>(
      `${this.baseURL}/createOrder/${customerID}`,
    ))
  }
}
