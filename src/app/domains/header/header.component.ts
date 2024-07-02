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

  isCartOpen = this.shoppingCartService.isCartOpen;
  cartItems = this.shoppingCartService.items;
  total = this.shoppingCartService.total;

  constructor() {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

  toggleShoppingCart(event: MouseEvent) {
    event.preventDefault();
    this.shoppingCartService.toggleCart();
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
