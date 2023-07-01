import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = [...items];
      },
    });
    console.log(this.route);
    this.route.url.subscribe({
      next: (url) => {
        console.log(url);
      },
    });
  }

  removeCartItem(item: CartItem) {
    this.cartService.removeItemFromCart(item);
  }

  onIncrementItemQuantity(cartItem: CartItem) {
    this.cartService.incrementCartItemQuantity(cartItem);
  }

  onDecrementItemQuantity(cartItem: CartItem) {
    this.cartService.decrementCartItemQuantity(cartItem);
  }

  getCartTotal() {
    return this.cartService.getCartTotal();
  }

  onCheckOut() {
    this.authenticationService.currentUser$.subscribe({
      next: (user) => {
        if (!user) {
          this.route.url.subscribe({
            next: (url) => {
              let path = 'checkout';
              this.authenticationService.previousPath = path;
            },
          });
          this.router.navigateByUrl('auth');
        } else {
          this.router.navigateByUrl('checkout');
        }
      },
    });
  }
}
