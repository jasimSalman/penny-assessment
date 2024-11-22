import { Route } from '@angular/router';
import { BookComponent } from './pages/books/books.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/Home/Home.component';
import {RegisterComponent, SigninComponent , ResetPasswordComponent} from '@penny-technical-assessment/auth-library'


export const appRoutes: Route[] = [
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ResetPasswordComponent },
  { path: '', component: HomeComponent },
];
