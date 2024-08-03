import { AuthService } from './../../services/auth.service';
import { RoleService } from './../../services/role.service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../../Interfaces/role';
import { AsyncPipe } from '@angular/common';

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
      AsyncPipe
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


  register() {
    this.AuthService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
      }
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
