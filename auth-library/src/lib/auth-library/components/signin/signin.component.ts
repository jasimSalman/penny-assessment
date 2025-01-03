import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth.actions';
import { FormsModule } from '@angular/forms';
import { AuthState } from '../../states/auth.reducers';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

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
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {


  constructor(private store: Store<AuthState>) {}

  username: string = '';
  password: string = '';

  isInvalid(controler: any): boolean {
    return controler.invalid && controler.touched;
  }

  onLogin() {
    this.store.dispatch(
      AuthActions.login({
        credentials: { username: this.username, password: this.password },
      })
    );

    this.username = '';
    this.password = '';
  }
}
