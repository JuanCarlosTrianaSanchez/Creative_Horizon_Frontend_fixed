
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  register(data: { name: string, lastname: string, phone: number, email: string, password: string, direccion: string, barrio: string, ciudad: string, pais: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Aquí deberías decodificar el token para obtener el usuario
    // Por ejemplo, utilizando jwt-decode
    // return jwt_decode(token);
    return { name: 'Usuario' }; // Placeholder
  }
}
