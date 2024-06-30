import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: { product: Product, quantity: number }[] = this.loadCartItems();
  private isCartOpenSubject = new BehaviorSubject<boolean>(false); 

  isCartOpen$ = this.isCartOpenSubject.asObservable(); 

  constructor() {
    this.saveCartItems(); // Save initial state
  }

  private loadCartItems(): { product: Product, quantity: number }[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveCartItems();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product._id !== productId);
    this.saveCartItems();
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.saveCartItems();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.saveCartItems();
  }
}

