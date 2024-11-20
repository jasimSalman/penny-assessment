import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterState } from '../../states/registration/register.reducers';
import { Store } from '@ngrx/store';
import * as RegisterActions from '../../states/registration/registration.actions';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { registerFormValidationFailed } from '../../states/form/form.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [RegisterService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private store = inject(Store<{ auth: RegisterState }>);
  username: string = '';
  password: string = '';
  email: string = '';
  confPassword: string = '';

  onSubmit() {
    const errors = {
      username: !this.username ? 'Username is required' : null,
      password: !this.password ? 'Password is required' : null,
      email: !this.email ? 'Email is required' : null,
      confPassword:
        this.password !== this.confPassword ? 'Passwords do not match' : null,
    };

    const hasErrors = Object.values(errors).some(error => error !== null);

    if (hasErrors) {
      this.store.dispatch(registerFormValidationFailed({ errors }));
      return;
    }

    this.store.dispatch(
      RegisterActions.register({
        credentials: {
          username: this.username,
          password: this.password,
          email: this.email,
        },
      })
    );
  }
}
