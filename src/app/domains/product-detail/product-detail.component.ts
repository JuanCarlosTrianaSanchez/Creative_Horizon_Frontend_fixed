
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule], // Añadir RouterModule aquí
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  products: Product[] = [];
  currentIndex: number = -1;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products); // Verificar que los productos se carguen correctamente
      this.setCurrentProduct();
    });
  }

  setCurrentProduct() {
    if (this.productId) {
      this.currentIndex = this.products.findIndex(product => product._id === this.productId);
      if (this.currentIndex !== -1) {
        this.product = this.products[this.currentIndex];
      }
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      const previousProductId = this.products[this.currentIndex - 1]._id;
      this.router.navigate(['/products', previousProductId]).then(() => {
        this.productId = previousProductId;
        this.setCurrentProduct();
      });
    }
  }

  goToNext() {
    if (this.currentIndex < this.products.length - 1) {
      const nextProductId = this.products[this.currentIndex + 1]._id;
      this.router.navigate(['/products', nextProductId]).then(() => {
        this.productId = nextProductId;
        this.setCurrentProduct();
      });
    }
  }
}
