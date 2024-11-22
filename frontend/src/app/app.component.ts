import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { autoLogin } from '@penny-technical-assessment/auth-library';
import { Store } from '@ngrx/store';
import { AuthState } from '@penny-technical-assessment/auth-library';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'penny-technical-assessment';

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}
