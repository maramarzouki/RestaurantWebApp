import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../services/CustomerSerivce/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  activeModal = inject(NgbActiveModal)

  customer: { email: string, password: string } = { email: '', password: '' };

  showLoginError: boolean = false;
  fieldsError: boolean = false;
  errorToShow: string = '';

  constructor(
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ){}

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

    this.service.loginCustomer(adminCreds)
      .subscribe(
        (response: any) => {
          if (response.Token) {
            this.router.navigate([`${this.router.url}`]);
            console.log("success:", response.Token);
            localStorage.setItem('Token', response.Token);
            this.activeModal.close();
            window.location.reload();
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
