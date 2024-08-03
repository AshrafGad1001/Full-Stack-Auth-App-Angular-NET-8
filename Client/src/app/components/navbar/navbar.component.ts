import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:
    [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      RouterLink,
      CommonModule
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  AuthService = inject(AuthService);
  router = inject(Router);


  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

}
