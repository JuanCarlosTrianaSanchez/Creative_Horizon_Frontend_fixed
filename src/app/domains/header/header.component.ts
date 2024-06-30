import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

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

  isCartOpen: boolean = false;

  constructor() {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get cartItems(): CartItem[] {
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

  increaseQuantity(item: CartItem): void {
    this.shoppingCartService.updateItemQuantity(item.product._id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.shoppingCartService.updateItemQuantity(item.product._id, item.quantity - 1);
    }
  }
}
