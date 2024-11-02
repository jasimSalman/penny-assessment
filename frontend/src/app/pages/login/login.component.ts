import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/auth.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthState } from '../../states/auth/auth.reducers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private store = inject(Store<{ auth: AuthState }>);
  username: string = '';
  password: string = '';

  onLogin() {
    this.store.dispatch(
      AuthActions.login({
        credentials: { username: this.username, password: this.password },
      })
    );
  }
}
