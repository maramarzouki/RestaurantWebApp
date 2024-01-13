import { Component, inject } from '@angular/core';
import { AdminService } from '../service/AdminService/admin.service';
import { Admin } from '../model/Admin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrl: './admins-list.component.css'
})
export class AdminsListComponent {

  admins?: Admin[]
  private modalService = inject(NgbModal)

  constructor(
    private service: AdminService
  ){}

  openAddAdminModal = () => {
    this.modalService.open(AddAdminComponent);
  }

  getAllAdmins = () => {
    this.service.getAllAdmins().subscribe(
      admins => {
        this.admins = admins;
        console.log(admins);
        
      }
    )
  }

  ngOnInit() {
    this.getAllAdmins()
  }
}
