import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  total: number = 0;
  isCartOpen: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addItem(product);
    this.updateCart();
  }

  removeFromCart(productId: string): void {
    this.shoppingCartService.removeItem(productId);
    this.updateCart();
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
    this.updateCart();
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  private updateCart(): void {
    this.cartItems = this.shoppingCartService.getItems();
    this.total = this.shoppingCartService.getTotal();
  }
}
