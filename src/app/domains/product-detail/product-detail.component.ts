import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FavoritesService } from '../../services/favorites.service'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  products: Product[] = [];
  currentIndex: number = -1;
  isFavorite: boolean = false;  

  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);
  private favoritesService = inject(FavoritesService);  
  private authService = inject(AuthService); 
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.setCurrentProduct();
    });
  }

  setCurrentProduct() {
    if (this.productId) {
      this.currentIndex = this.products.findIndex(product => product._id === this.productId);
      if (this.currentIndex !== -1) {
        this.product = this.products[this.currentIndex];
        this.checkIfFavorite();  
      }
    }
  }

  checkIfFavorite(): void {
    const user = this.authService.getCurrentUser(); 
    if (this.product && user) {
      this.favoritesService.isFavorite(user._id, this.product._id).subscribe(isFav => {
        this.isFavorite = isFav;
      });
    }
  }
  

  toggleFavorite(): void {
    const user = this.authService.getCurrentUser(); 
    if (this.product && user) {
      if (this.isFavorite) {
        this.favoritesService.removeFavorite(user._id, this.product._id).subscribe(() => {
          this.isFavorite = false;
        });
      } else {
        this.favoritesService.addFavorite(user._id, this.product._id).subscribe(() => {
          this.isFavorite = true;
        });
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

  addToCart(): void {
    if (this.product) {
      this.shoppingCartService.addItem(this.product);
    }
  }
}
