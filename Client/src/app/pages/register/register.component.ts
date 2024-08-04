import { AuthService } from './../../services/auth.service';
import { RoleService } from './../../services/role.service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../../Interfaces/role';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../Interfaces/validation-error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:
    [
      MatInputModule,
      MatIconModule,
      MatSelectModule,
      ReactiveFormsModule,
      RouterLink,
      MatSnackBarModule,
      AsyncPipe,
      MatSnackBarModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  AuthService = inject(AuthService);
  roleService = inject(RoleService);
  $roles!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);
  errors!: ValidationError[];



  register() {
    this.AuthService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigate(['/login'])
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status == 400) {
          this.errors = err!.error;
          this.matSnackBar.open('validation error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          })
        }
      },
      complete: () => console.log("Register Success")
    });
  }



  ngOnInit(): void {

    this.$roles = this.roleService.getRoles();



    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [''],
      confirmPassword: ['', [Validators.required]]
    },
      {

        validator: this.passwordMatchValidator
      }
    );
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      return { passwordMismatch: true }
    }
    return null;
  }

}
