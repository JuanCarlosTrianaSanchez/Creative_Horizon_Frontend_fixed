import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_URL = 'http://18.116.46.224:3000/api/favorites';

  constructor(private http: HttpClient) {}

  getFavorites(userId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}`);
  }

  addFavorite(userId: string, productId: string): Observable<any> {
    return this.http.post(this.API_URL, { userId, productId });
  }

  removeFavorite(userId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${userId}/${productId}`);
  }

 
  isFavorite(userId: string, productId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/isFavorite/${userId}/${productId}`);
  }
}
