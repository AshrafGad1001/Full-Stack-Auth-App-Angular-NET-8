import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, retry } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../Interfaces/login-request';
import { AuthResponse } from '../Interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token'

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/login`, data).pipe(
      map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token)
        }
        return response;
      })
    );
  }
}
