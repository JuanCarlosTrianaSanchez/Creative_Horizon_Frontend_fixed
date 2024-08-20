import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';
import { initialState, FavoritesState } from './favorites.state';

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { product }) => ({
    ...state,
    favorites: [...state.favorites, product],
  })),
  on(removeFavorite, (state, { productId }) => ({
    ...state,
    favorites: state.favorites.filter(product => product._id !== productId),
  }))
);
