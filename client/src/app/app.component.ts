import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { CartItem } from './models/cartItem';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadCart();
  }

  loadUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const user: User = JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }

  loadCart() {
    this.cartService.loadCart();
  }

  onEvent(event: any) {
    event.stopPropagation();
  }
}
