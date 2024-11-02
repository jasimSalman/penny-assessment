import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../models/register.models';
import { environment } from 'frontend/src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  register(credentials: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/auth/sign-up`,
      credentials
    );
  }
}
