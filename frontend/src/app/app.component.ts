import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  standalone: true,
  imports: [RouterModule,RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'penny-technical-assessment';
}
