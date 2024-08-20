import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../store/favorites/favorites.actions';
import { FavoritesState } from '../../store/favorites/favorites.state';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);
  private store = inject(Store<{ favorites: FavoritesState }>);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  favorites = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.filteredProducts.set(data);
        this.loadFavorites();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addToCart(product: Product): void {
    console.log('Adding product to cart:', product); 
    this.shoppingCartService.addItem(product);
  }

  toggleFavorite(product: Product): void {
    const isFavorite = this.isFavorite(product._id);

    if (isFavorite) {
      this.store.dispatch(removeFavorite({ productId: product._id }));
    } else {
      this.store.dispatch(addFavorite({ product }));
    }

    this.loadFavorites();
  }

  public isFavorite(productId: string): boolean {
    let isFavorite = false;
    this.favorites().forEach((product) => {
      if (product._id === productId) {
        isFavorite = true;
      }
    });
    return isFavorite;
  }
  

  private loadFavorites(): void {
    this.store.select('favorites').subscribe((favoritesState) => {
      this.favorites.set(favoritesState.favorites);
    });
  }
}
