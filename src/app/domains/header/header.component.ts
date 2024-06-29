/* import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private shoppingCartService = inject(ShoppingCartService);
  private cdr = inject(ChangeDetectorRef); 

  isCartOpen: boolean = false;

  constructor() {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get cartItems() {
    const items = this.shoppingCartService.getItems();
    console.log('Cart items in header:', items);
    return items;
  }

  get total() {
    const total = this.shoppingCartService.getTotal();
    console.log('Cart total in header:', total);
    return total;
  }

  logout() {
    this.authService.logout();
  }

  openShoppingCart() {
    this.isCartOpen = !this.isCartOpen;
    this.cdr.detectChanges(); 
    console.log('Cart items:', this.cartItems);
  }

  removeFromCart(productId: string): void {
    this.shoppingCartService.removeItem(productId);
    this.cdr.detectChanges(); 
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
    this.cdr.detectChanges(); 
  }
}
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private shoppingCartService = inject(ShoppingCartService);

  isCartOpen: boolean = false; // Variable para controlar la visibilidad del carrito

  constructor() {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get cartItems() {
    return this.shoppingCartService.getItems();
  }

  get total() {
    return this.shoppingCartService.getTotal(); 
  }

  logout() {
    this.authService.logout();
  }

  openShoppingCart(event: MouseEvent) {
    event.preventDefault(); 
    this.isCartOpen = !this.isCartOpen; 
  }

  removeFromCart(productId: string): void {
    this.shoppingCartService.removeItem(productId);
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
  }
}
