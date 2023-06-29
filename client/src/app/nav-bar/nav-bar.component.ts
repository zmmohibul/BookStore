import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  user: User | null = null;

  constructor(
    private authService: AuthenticationService,
    public cartService: CartService
  ) {
    this.authService.currentUser$.subscribe({
      next: (user) => (this.user = user),
    });
  }

  logout() {
    this.authService.logout();
  }
}
