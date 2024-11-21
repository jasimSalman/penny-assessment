import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../states/auth/auth.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services//auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private store = inject(Store<{ auth: AuthState }>);
  username: string = '';
  password: string = '';
  email: string = '';
  confPassword: string = '';

  onSubmit() {
    this.store.dispatch(
      AuthActions.register({
        credentials: {
          username: this.username,
          password: this.password,
          email: this.email,
        },
      })
    );

    this.username = '';
    this.email = '';
    this.password = '';
    this.confPassword = '';
  }
}
