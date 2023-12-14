import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  getUserId(): string | null {
    const access_token = this.getAccessToken();

    if (access_token) {
      const decodedToken = helper.decodeToken(access_token);
      return decodedToken ? decodedToken.user_id : null;
    }

    return null;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  register(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post(`${this.baseUrl}/login/`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('username', username); 
        this.setTokens(response);
        this.setAuthenticated(true);
        return response;
      })
    );
  }

  setTokens(tokens: { access: string; refresh: string }) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  checkToken() {
    const access_token = this.getAccessToken();
    const refresh_token = this.getRefreshToken();

    if (access_token && !helper.isTokenExpired(access_token)) {
      this.setAuthenticated(true);
    } else if (refresh_token) {
      this.refreshAccessToken(refresh_token);
    } else {
      this.logout();
    }
  }

  refreshAccessToken(refreshToken: string) {
    this.http.post(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      tap((error) => {
        this.logout();
        return error;
      })
    ).subscribe((response: any) => {
      this.setTokens(response);
      this.setAuthenticated(true);
    });
  }

  logout() {
    const refresh_token = this.getRefreshToken();
    this.setAuthenticated(false);
    if (refresh_token) {
      this.http.post(`${this.baseUrl}/logout/`, { refresh: refresh_token })
      .subscribe({
        next: (response) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('username');
          this.setAuthenticated(false);
        },
        error: (error) => {
          console.error('Error al cerrar sesión', error);
        },
      });
    }
  }
}
