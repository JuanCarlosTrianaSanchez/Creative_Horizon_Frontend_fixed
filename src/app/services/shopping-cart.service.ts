import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { signal, effect, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSignal = signal<{ product: Product, quantity: number }[]>(this.loadCartItems());
  private isCartOpenSignal = signal<boolean>(false);

  items = () => this.itemsSignal();

  isCartOpen = () => this.isCartOpenSignal();

  total = () => this.itemsSignal().reduce((total, item) => total + item.product.price * item.quantity, 0);

  constructor() {
    effect(() => this.saveCartItems(this.itemsSignal()));
  }

  private loadCartItems(): { product: Product, quantity: number }[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveCartItems(items: { product: Product, quantity: number }[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addItem(product: Product, quantity: number = 1): void {
    const items = this.itemsSignal();
    const existingItem = items.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.itemsSignal.set([...items]); 
  }

  removeItem(productId: string): void {
    const items = this.itemsSignal().filter(item => item.product._id !== productId);
    this.itemsSignal.set([...items]); 
  }

  clearCart(): void {
    this.itemsSignal.set([]); // Limpiar el carrito
  }

  toggleCart(): void {
    this.isCartOpenSignal.set(!this.isCartOpenSignal());
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const items = this.itemsSignal();
    const item = items.find(item => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.itemsSignal.set([...items]); 
  }
}
