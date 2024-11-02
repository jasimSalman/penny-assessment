import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterState } from '../../states/registration/register.reducers';
import { Store } from '@ngrx/store';
import * as RegisterActions from '../../states/registration/registration.actions';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

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

  onSubmit() {
    console.log(this.email, this.username, this.password);
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
