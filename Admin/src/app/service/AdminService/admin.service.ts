import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/Admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL = 'http://localhost:3001';


  constructor(private http: HttpClient) { }

  loginAdmin = (loginCreds: object): Observable<Admin> => {
    const options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };

    return (this.http.post<Admin>(
      `${this.baseURL}/loginAdmin`,
      loginCreds,
      options
    ))
  }

  getAdminByID = (adminID: number): Observable<Admin> => {
    return this.http.get<Admin>(`${this.baseURL}/getAdminDetails/${adminID}`)
  }

  updateAdmin = (admin: Object, adminID: number): Observable<Admin> => {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    };
    return this.http.put<Admin>(
      `${this.baseURL}/updateAdmin/${adminID}`,
      admin,
      options
    );
  }

  getAllAdmins = (): Observable<Admin[]> => {
    return this.http.get<Admin[]>(`${this.baseURL}/getAllAdmins`)
  }

  addAdmin = (admin: Object): Observable<Admin> => {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.post<Admin>(
      `${this.baseURL}/addAdmin`,
      admin,
      options
    )
  }

}
