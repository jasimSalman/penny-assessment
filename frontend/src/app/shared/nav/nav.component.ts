import { Store } from '@ngrx/store';
import { logout } from './../../states/auth/auth.actions';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthState } from '../../states/auth/auth.reducers';
import { selectUser, selectIsLoggedIn } from '../../states/auth/auth.selector';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private store = inject(Store<{ auth: AuthState }>);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch(logout());
  }
}
