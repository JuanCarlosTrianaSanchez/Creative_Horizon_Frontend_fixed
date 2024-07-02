import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { AboutUsComponent } from './domains/about-us/about-us.component';
import { ProductsComponent } from './domains/products/products.component';
import { ProductDetailComponent } from './domains/product-detail/product-detail.component';
import { RegisterComponent } from './domains/register/register.component';
import { LoginComponent } from './domains/login/login.component';
import { CheckoutComponent } from './domains/checkout/checkout.component';  
import { authGuard } from './guards/auth.guard';
import { redirectIfLogged } from './guards/redirectIfLogged.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent, canActivate: [redirectIfLogged] }, 
  { path: 'register', component: RegisterComponent, canActivate: [redirectIfLogged] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] } 
];
