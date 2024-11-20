import { Component } from '@angular/core';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './pages/Home/Home.component';
import { autoLogin } from './states/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from './states/auth/auth.reducers';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    NavComponent,
    HomeComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'penny-technical-assessment';

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}
