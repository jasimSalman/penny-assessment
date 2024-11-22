import { Store } from '@ngrx/store';
import { logout } from '@penny-technical-assessment/auth-library';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthState } from '@penny-technical-assessment/auth-library';
import { selectUser, selectIsLoggedIn } from '@penny-technical-assessment/auth-library';

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
