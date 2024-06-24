/* 
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  initialProducts = signal<Product[]>([]);
  featuredProducts = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.initialProducts.set(products.slice(0, 12));
      this.featuredProducts.set(products.filter(product => product.featured).slice(0, 3));
    });
  }
}
 */
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  initialProducts = signal<Product[]>([]);
  featuredProducts = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.initialProducts.set(products.slice(0, 12));
      const featured = products.filter(product => product.featured);
      console.log('Featured Products:', featured); // Añadir para depuración
      this.featuredProducts.set(featured.slice(0, 3));
    });
  }
}
