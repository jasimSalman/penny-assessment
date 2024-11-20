import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './states/auth/auth.reducers';
import { AuthEffects } from './states/auth/auth.effects';
import { RegsiterEffects } from './states/registration/register.effects';
import { booksReducer } from './states/book/books.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects, RegsiterEffects]),
    provideHttpClient(withFetch()),
    provideState({ name: 'books', reducer: booksReducer }),
  ],
};
