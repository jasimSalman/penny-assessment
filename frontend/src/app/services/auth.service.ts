import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { environment } from 'frontend/src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  timeoutInterval: any;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/sign-in`,
      credentials
    );
  }

  setUser(token: string, username: string) {
    const sessionExpiration = new Date().getTime() + 8 * 60 * 60 * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('sessionExpiration', sessionExpiration.toString());
    this.calcTimeoutInterval(sessionExpiration);
  }

  calcTimeoutInterval(sessionExpiration: number) {
    const currentDate = new Date().getTime();
    const timeInterval = sessionExpiration - currentDate;
    this.timeoutInterval = setTimeout(() => {}, timeInterval);
  }

  getUser() {
    const token = localStorage.getItem('token');
    const sessionExpiration = localStorage.getItem('sessionExpiration');
    const username = localStorage.getItem('username');

    if (token && sessionExpiration && username) {
      const expirDate = parseInt(sessionExpiration, 10);
      const user = { username };
      this.calcTimeoutInterval(expirDate);
      return { token, user, sessionExpiration };
    }

    return null;
  }
}
