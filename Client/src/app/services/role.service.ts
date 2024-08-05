import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../Interfaces/role'
import { RoleCreateRequest } from '../Interfaces/role-create-request';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRoles = (): Observable<Role[]> => {
    return this.http.get<Role[]>(`${this.apiUrl}roles`);
  }


  createRole = (role: RoleCreateRequest): Observable<{ message: string }> => {
    return this.http.post<{ message: string; }>(`${this.apiUrl}roles`, role);
  }
}
