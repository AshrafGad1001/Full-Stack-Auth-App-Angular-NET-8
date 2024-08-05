import { Component, inject } from '@angular/core';
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../Interfaces/role-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  errorMessage: string = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);


  createRole(role: RoleCreateRequest) {
    console.log(this.errorMessage.toString());
    this.roleService.createRole(role).subscribe({

      next: (response: { message: string }) => {
        this.matSnackBar.open('Role Created Successfully.', "Ok", {
          duration: 5000,

        });
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    });
  }
}
