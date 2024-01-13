import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {
  
  localStorageToken: any;
  token: any;
  adminID: string = '';

  constructor() { }

  getAdminID = () => {
    this.localStorageToken = localStorage.getItem('Token');
    this.token = jwtDecode(this.localStorageToken)
    this.adminID = this.token._id

  }

  ngOnInit() {
    this.getAdminID();
  }
}
