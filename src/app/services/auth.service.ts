import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  public register(username: string, password: string): Observable<any> {
    return this.http.post('/api/register', { username, password });
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('/api/login', { username, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}