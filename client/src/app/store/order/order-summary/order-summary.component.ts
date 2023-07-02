import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../../models/userDetail';
import { CartItem } from '../../../models/cartItem';
import { AuthenticationService } from '../../../services/authentication.service';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;
      },
    });
  }
}
