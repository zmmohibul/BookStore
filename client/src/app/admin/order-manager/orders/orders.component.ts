import {Component, Input, OnInit} from '@angular/core';
import {PaginatedList} from '../../../models/paginatedList';
import {Order} from '../../../models/order/order';
import {OrderService} from '../../../services/order.service';
import {QueryParams} from '../../../models/queryParams';
import {OrderStatus} from '../../../models/order/orderStatus';
import {OrderSummaryItem} from '../../../models/order/orderSummaryItem';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input() orderStatus: OrderStatus = OrderStatus.OrderPlaced;
  orders: PaginatedList<Order> = new PaginatedList<Order>();
  orderSummary: OrderSummaryItem[] = [];
  orderSummaryInViewId = 0;

  orderInView: Order | undefined = undefined;

  orderQueryParams = new QueryParams();
  loading = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderQueryParams.pageSize = 4;
    this.orderQueryParams.pageNumber = 1;
    this.orderQueryParams.orderStatus = this.orderStatus;
  }

  viewOrderDetail(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.orderSummary = [];
        this.orderSummaryInViewId = order.id;
        this.orderInView = order;
        for (let item of order.orderedBooks) {
          this.orderSummary.push({
            id: item.bookDetails.bookId,
            type: item.bookDetails.bookType,
            unitPrice: item.price,
            quantity: item.quantity,
            name: item.bookDetails.bookName,
            pictureUrl: item.bookDetails.pictureUrl,
          });
        }
      },
    });
  }
}
