import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);

  initialProducts = signal<Product[]>([]);
  featuredProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.initialProducts.set(products.slice(0, 12));
      const featured = products.filter(product => product.featured);
      this.featuredProducts.set(featured.slice(0, 3));
    });
  }

  getInitialProducts(): Product[] {
    return this.initialProducts();
  }

  getFeaturedProducts(): Product[] {
    return this.featuredProducts();
  }
}
