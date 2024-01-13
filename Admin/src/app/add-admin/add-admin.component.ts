import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../service/AdminService/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  activeModal = inject(NgbActiveModal)

  admin = { firstname: '', lastname: '', email: '', password: '', phoneNumber: 0 }

  constructor(
    private service: AdminService
  ) { }

  addAdmin = (f: NgForm) => {
    const newAdmin = {
      firstname: f.value.firstname,
      lastname: f.value.lastname,
      email: f.value.email,
      password: f.value.password,
      phoneNumber: f.value.phoneNumber
    }

    this.service.addAdmin(newAdmin).subscribe(
      res => {
        this.activeModal.close();
        window.location.reload();
      }
    )
  }
}
