import { RoleService } from './../../services/role.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  roleService = inject(RoleService);
  $roles!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);






  ngOnInit(): void {

    this.$roles = this.roleService.getRoles();



    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [''],
      confirmPassword: ['', [Validators.required]]
    });

  }


  register() {

  }
}
