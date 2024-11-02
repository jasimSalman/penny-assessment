import { Store } from '@ngrx/store';
import { logout } from './../../states/auth/auth.actions';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthState } from '../../states/auth/auth.reducers';
import {
  selectToken,
  selectUser,
  selectIsLoggedIn,
} from '../../states/auth/auth.selector';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private store = inject(Store<{ auth: AuthState }>);

  selectIsLoggedIn$ = this.store.select(selectIsLoggedIn);
  selectedUser$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch(logout());
  }
}
