import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  setToken(token: string) {
    localStorage.setItem("user_token", token);
  }

  register(data: { 
    name: string, 
    lastname: string, 
    phone: number, 
    email: string, 
    password: string, 
    direccion: string, 
    barrio: string, 
    ciudad: string, 
    pais: string 
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }
  
  login(credentials: { 
    email: string, 
    password: string 
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(tap(response => {
          this.setToken(response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('user_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token');
  }

  getCurrentUser() {
    const token = localStorage.getItem('user_token');
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const user = JSON.parse(jsonPayload);
      console.log('User data from token:', user); 

      return user;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
