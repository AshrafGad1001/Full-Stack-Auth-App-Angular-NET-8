import { Component, inject } from '@angular/core';
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../Interfaces/role-create-request';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleService = inject(RoleService)
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;


  createRole(role: RoleCreateRequest) {

  }
}
