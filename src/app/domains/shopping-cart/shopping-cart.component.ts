import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

}


/* 
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service'; // Asegúrate de crear este servicio si aún no existe

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  cartItems = signal<CartItem[]>([]); // Suponiendo que tienes una interfaz CartItem

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.shoppingCartService.getCartItems().subscribe({
      next: (items: CartItem[]) => {
        this.cartItems.set(items);
      },
      error: (error) => {
        console.error('Error loading cart items', error);
      }
    });
  }

  // Métodos adicionales para manejar el carrito de compras
}
 */