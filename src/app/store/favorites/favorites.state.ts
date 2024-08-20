
import { Product } from '../../models/product.model';

export interface FavoritesState {
  favorites: Product[];
}

export const initialState: FavoritesState = {
  favorites: [],
};
