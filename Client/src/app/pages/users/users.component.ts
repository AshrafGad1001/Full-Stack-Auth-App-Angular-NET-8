import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports:
    [
      CommonModule,
      AsyncPipe
    ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  authService = inject(AuthService);
  users$ = this.authService.getAll();
}
