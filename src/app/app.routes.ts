import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { AboutUsComponent } from './domains/about-us/about-us.component';
import { ProductsComponent } from './domains/products/products.component';
import { ProductDetailComponent } from './domains/product-detail/product-detail.component';
import { RegisterComponent } from './domains/register/register.component';
import { LoginComponent } from './domains/login/login.component';
import { ShoppingCartComponent } from './domains/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'shopping-cart', component: ShoppingCartComponent },
];
