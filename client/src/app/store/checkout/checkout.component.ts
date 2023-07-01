import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDetail } from '../../models/userDetail';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUserDetail: UserDetail | undefined;
  cartItems: CartItem[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;
      },
    });

    this.authenticationService.getCurrentUserDetail().subscribe({
      next: (response) => {
        this.currentUserDetail = response;
      },
    });
  }
}
