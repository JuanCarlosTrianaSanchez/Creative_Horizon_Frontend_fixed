
import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ product: Product }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ productId: string }>()
);
