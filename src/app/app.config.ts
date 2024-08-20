import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { favoritesReducer } from './store/favorites/favorites.reducer'; // Asegúrate que esta ruta sea la correcta

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ favorites: favoritesReducer })  
  ]
};
