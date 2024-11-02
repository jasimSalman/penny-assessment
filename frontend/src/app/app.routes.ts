import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BookComponent } from './pages/books/books.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'books', component: BookComponent, canActivate:[AuthGuard] },
];
