import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../states/auth.reducers';
import * as AuthActions from '../../states/auth.actions';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resetPassword.component.html',
  styleUrl: './resetPassword.component.css',
})
export class ResetPasswordComponent {

  constructor(private store: Store<AuthState>) {}
  username = '';
  otp = '';
  password = '';
  step = 1;

  requestOtp() {
    this.store.dispatch(AuthActions.generateOtp({ username: this.username }));
    this.step = 2;
  }

  isInvalid(controler: any): boolean {
    return controler.invalid && controler.touched;
  }

  verifyOtp() {
    this.store.dispatch(
      AuthActions.validateOtp({ username: this.username, otp: this.otp })
    );
    this.step = 3;
  }

  resetPassword() {
    this.store.dispatch(
      AuthActions.resetPassword({
        username: this.username,
        newPassword: this.password,
      })
    );
  }

}
