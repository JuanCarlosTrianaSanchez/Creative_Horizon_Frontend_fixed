/* import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);

  checkoutForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  user: WritableSignal<any> = signal(null);
  products: WritableSignal<any[]> = signal([]);

  constructor() {
    this.checkoutForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userData = this.authService.getCurrentUser();
    this.user.set(userData); // Usar set en la señal
    console.log('Current User:', this.user());

    const cartItems = this.shoppingCartService.items();
    this.products.set(cartItems.map(item => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    })));
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      const order = {
        userId: this.user()._id,
        products: this.products().map(product => ({
          product: product.productId,
          quantity: product.quantity,
          priceAtPurchase: product.priceAtPurchase
        })),
        total: this.shoppingCartService.total(),
        paymentMethod: this.checkoutForm.value.paymentMethod
      };

      this.checkoutService.createPurchase(order).subscribe(
        (response: any) => {
          console.log('Orden de compra creada:', response);
          this.successMessage = 'Compra realizada con éxito';
          this.isSubmitting = false;
          this.router.navigate(['/confirmacion-compra']);
        },
        (error: any) => {
          console.error('Error al crear la orden de compra:', error);
          this.errorMessage = 'Error al crear la orden de compra. Por favor, inténtalo de nuevo.';
          this.isSubmitting = false;
        }
      );
    }
  }

  selectPaymentMethod(method: string) {
    this.checkoutForm.patchValue({
      paymentMethod: method
    });
  }

  get total() {
    return this.shoppingCartService.total();
  }
}
 */

import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);

  checkoutForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  user: WritableSignal<any> = signal(null);
  products: WritableSignal<any[]> = signal([]);

  constructor() {
    this.checkoutForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userData = this.authService.getCurrentUser();
    if (userData) {
      this.user.set(userData); // Usar set en la señal
      console.log('Current User:', this.user());
    } else {
      console.error('No user data found.');
    }

    const cartItems = this.shoppingCartService.items();
    this.products.set(cartItems.map(item => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    })));
  }

  onSubmit() {
    console.log('onSubmit called');
    if (this.checkoutForm.valid && this.user()._id) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      const order = {
        userId: this.user()._id,
        products: this.products().map(product => ({
          product: product.productId,
          quantity: product.quantity,
          priceAtPurchase: product.priceAtPurchase
        })),
        total: this.shoppingCartService.total(),
        paymentMethod: this.checkoutForm.value.paymentMethod
      };

      console.log('Order to be submitted:', order);

      this.checkoutService.createPurchase(order).subscribe(
        (response: any) => {
          console.log('Orden de compra creada:', response);
          this.successMessage = 'Compra realizada con éxito';
          this.isSubmitting = false;
          this.router.navigate(['/confirmacion-compra']);
        },
        (error: any) => {
          console.error('Error al crear la orden de compra:', error);
          this.errorMessage = 'Error al crear la orden de compra. Por favor, inténtalo de nuevo.';
          this.isSubmitting = false;
        }
      );
    } else {
      console.error('Form is invalid or user ID is missing');
      if (!this.user()._id) {
        this.errorMessage = 'No se pudo encontrar el ID de usuario.';
      }
    }
  }

  selectPaymentMethod(method: string) {
    this.checkoutForm.patchValue({
      paymentMethod: method
    });
  }

  get total() {
    return this.shoppingCartService.total();
  }
}
