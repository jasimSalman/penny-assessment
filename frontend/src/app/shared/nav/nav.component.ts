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

  logout() {
    this.store.dispatch(logout());
  }
}
