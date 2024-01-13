import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseURL = 'http://localhost:3001';


  constructor(private http: HttpClient) { }

  loginCustomer = (loginCreds: object): Observable<Customer> => {
    const options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };

    return (this.http.post<Customer>(
      `${this.baseURL}/loginCustomer`,
      loginCreds,
      options
    ))
  }
}
