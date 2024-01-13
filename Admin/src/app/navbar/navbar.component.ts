import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../service/AuthService/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  localStorageToken : any;
  token : any;
  adminID : string = '';

  constructor(
    private router: Router,
    private service: AuthenticationService
  ){}

  getAdminID = () => {
    this.localStorageToken = localStorage.getItem('Token');
    this.token = jwtDecode(this.localStorageToken)
    this.adminID = this.token._id
    
  }

  logout () {
    this.service.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.getAdminID();
  }
}
