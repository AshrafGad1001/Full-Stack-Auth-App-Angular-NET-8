import { Component, inject } from '@angular/core';
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../Interfaces/role-create-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    RoleListComponent,
    MatSnackBarModule,
    AsyncPipe,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);

  errorMessage: string = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAll();
  selectedUser: string = "";
  selectedRole: string = "";



  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Created Successfully.', "Ok", {
          duration: 5000,

        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    });
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role deleted Successfully.', "Close", {
          duration: 5000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, "Close", {
          duration: 5000,
        });
      }
    });
  }

  assignRole() {
    this.roleService.assignRole(this.selectedUser, this.selectedRole)
      .subscribe({
        next: (response) => {
          this.roles$ = this.roleService.getRoles();
          this.matSnackBar.open('Role Assigned Successfully.', "Close", {
            duration: 5000,
          });
        },
        error: (error: HttpErrorResponse) => {
          this.matSnackBar.open(error.message, "Close", {
            duration: 5000,
          });
        }
      });
  }
}
