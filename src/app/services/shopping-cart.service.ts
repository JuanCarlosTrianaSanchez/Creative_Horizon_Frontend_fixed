import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: { product: Product, quantity: number }[] = [];

  constructor() {
    this.loadCart();
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveCart();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product._id !== productId);
    this.saveCart();
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private saveCart(): void {
    localStorage.setItem('shoppingCart', JSON.stringify(this.items));
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.items = JSON.parse(storedCart);
    }
  }
}
