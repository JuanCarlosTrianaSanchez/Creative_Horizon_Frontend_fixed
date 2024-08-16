import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://18.116.46.224:3000/api/purchases';

  constructor(private http: HttpClient) {}

  createPurchase(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
