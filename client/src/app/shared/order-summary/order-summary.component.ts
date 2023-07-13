import { Component, Input, OnInit } from '@angular/core';
import { OrderSummaryItem } from '../../models/order/orderSummaryItem';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderId: number = 0;
  @Input() orderSummaryItems: OrderSummaryItem[] = [];
  @Input() order: Order | undefined = undefined;
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
