import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = [...items];
      },
    });
  }

  removeCartItem(item: CartItem) {
    this.cartService.removeItemFromCart(item);
  }

  onIncrementItemQuantity(cartItem: CartItem) {
    this.cartService.incrementCartItemQuantity(cartItem);
    // this.cartService.addItemToCart(newItem);
  }

  onDecrementItemQuantity(cartItem: CartItem) {
    this.cartService.decrementCartItemQuantity(cartItem);
    // this.cartService.addItemToCart(cartItem);
  }
}
