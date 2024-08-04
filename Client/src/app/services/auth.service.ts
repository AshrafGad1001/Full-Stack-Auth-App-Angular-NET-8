import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../Interfaces/login-request';
import { AuthResponse } from '../Interfaces/auth-response';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../Interfaces/register-request';
import { UserDetails } from '../Interfaces/user-detail';

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
  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';
  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token)
      return false;
    return !this.isTokenExpired();
  }
  private isTokenExpired() {
    const token = this.getToken();
    if (!token)
      return true;

    const decode = jwtDecode(token);

    const isTokenExpired = Date.now() >= decode['exp']! * 1000;

    if (isTokenExpired)
      return this.logout();

    return isTokenExpired;

  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
  getUserDetail = () => {
    const token = this.getToken();
    if (!token)
      return null;

    const decodeToken: any = jwtDecode(token);

    const userDetail = {
      id: decodeToken.nameid,
      fullName: decodeToken.name,
      email: decodeToken.email,
      roles: decodeToken.role || []
    }
    return userDetail;
  }
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  getDetail = (): Observable<UserDetails> => {
    return this.http.get<UserDetails>(`${this.apiUrl}account/detail`);
  }


  getAll = (): Observable<UserDetails[]> =>
    this.http.get<UserDetails[]>(`${this.apiUrl}account`);

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodeToken: any = jwtDecode(token);
    return decodeToken.role || null;
  }




}


