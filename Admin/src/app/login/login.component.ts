import { Component } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private service: AdminService,
    private router: Router
  ) { }

  admin: { email: string, password: string } = { email: '', password: '' };

  showLoginError: boolean = false;
  fieldsError: boolean = false;
  errorToShow: string = '';

  login = (f: NgForm) => {
    if (f.invalid) {
      this.fieldsError = true;
      this.showLoginError = false;
      return;
    }
    const adminCreds = {
      email: f.value.email,
      password: f.value.password
    }

    this.service.loginAdmin(adminCreds)
      .subscribe(
        (response: any) => {
          if (response.Token) {
            this.router.navigate(['/dashboard']);
            console.log("success:", response.Token);
            localStorage.setItem('Token', response.Token);
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          this.fieldsError = false;
          this.showLoginError = true;
          this.errorToShow = error.error.ERROR
        }
      );
  }
}
