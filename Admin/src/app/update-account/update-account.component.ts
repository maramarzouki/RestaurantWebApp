import { Component } from '@angular/core';
import { AdminService } from '../service/AdminService/admin.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  adminID: number = 0;
  admin: { firstName: string, lastName: string, email: string } = { firstName: '', lastName: '', email: '' }
  firstNameValue: string = '';
  lastNameValue: string = '';
  emailValue: string = '';

  constructor(
    private service: AdminService,
    private route: ActivatedRoute
  ) { }

  getAdminDetails = () => {
    this.service.getAdminByID(this.adminID).subscribe(
      admin => {
        console.log(admin);

        this.admin.firstName = admin.firstname;
        this.admin.lastName = admin.lastname;
        this.admin.email = admin.email;
        console.log(this.admin);

        this.firstNameValue = this.admin.firstName;
        this.lastNameValue = this.admin.lastName;
        this.emailValue = this.admin.email;
      }
    )
  }

  updateAdmin = (f: NgForm) => {
    const admin={
      firstname:f.value.firstname,
      lastname:f.value.lastname,
      email:f.value.email
    }
    this.service.updateAdmin(admin,this.adminID).subscribe(
      res=>{
        window.location.reload();
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.adminID = params['adminID']
        console.log(this.adminID);
      }
    )

    this.getAdminDetails();
  }


}
