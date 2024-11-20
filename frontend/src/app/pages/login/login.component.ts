import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { AuthState } from '../../states/auth/auth.reducers';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import {
  loginFormValidationFailed,
} from '../../states/form/form.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private store: Store<AuthState>) {}

  username: string = '';
  password: string = '';

  onLogin() {
    if (!this.username || !this.password) {
      this.store.dispatch(
        loginFormValidationFailed({
          errors: {
            username: !this.username ? 'Username is required' : null,
            password: !this.password ? 'Password is required' : null,
          },
        })
      );
      return;
    }

    this.store.dispatch(
      AuthActions.login({
        credentials: { username: this.username, password: this.password },
      })
    );
  }
}
