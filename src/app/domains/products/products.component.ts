import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService)

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log(data);
        this.products.set(data);
        this.filteredProducts.set(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

/*   products = signal([]);
  filteredProducts = signal([]);

  constructor() { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log(data)
        this.products.set(data);
        this.filteredProducts.set(data);
      },
      error: error => {
        console.log(error)
      }
    });
  }

} */
