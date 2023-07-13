import { Component, Input } from '@angular/core';
import { OrderSummaryItem } from '../../models/order/orderSummaryItem';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss'],
})
export class OrderInvoiceComponent {
  @Input() orderId: number = 0;
  @Input() orderSummaryItems: OrderSummaryItem[] = [];
  @Input() order: Order | undefined = undefined;
  loading = false;

  constructor() {}

  ngOnInit(): void {}

  getOrderTotal() {
    let total = 0;

    if (this.order) {
      for (let item of this.order.orderedBooks) {
        total += item.price * item.quantity;
      }
    }

    return total;
  }
}
