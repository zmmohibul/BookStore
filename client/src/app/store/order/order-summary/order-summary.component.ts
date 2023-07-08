import { Component, Input, OnInit } from '@angular/core';
import { UserDetail } from '../../../models/userDetail';
import { CartItem } from '../../../models/cartItem';
import { AuthenticationService } from '../../../services/authentication.service';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderSummaryItem } from '../../../models/order/orderSummaryItem';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderSummaryItems: OrderSummaryItem[] = [];
  loading = false;

  constructor() {}

  ngOnInit(): void {}

  getOrderTotal() {
    let total = 0;
    for (let item of this.orderSummaryItems) {
      total += item.unitPrice * item.quantity;
    }

    return total;
  }
}
