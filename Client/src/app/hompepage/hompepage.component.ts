import { Component } from '@angular/core';
import { AuthenticationService } from '../services/AuthService/authentication-service.service';

@Component({
  selector: 'app-hompepage',
  templateUrl: './hompepage.component.html',
  styleUrl: './hompepage.component.css'
})
export class HompepageComponent {

  authenticated: boolean;

  constructor(private authService: AuthenticationService) {
    this.authenticated = this.authService.isAuthenticated();
  }

}
