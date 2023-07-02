import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../../models/userDetail';
import { CartItem } from '../../../models/cartItem';
import { AuthenticationService } from '../../../services/authentication.service';
import { CartService } from '../../../services/cart.service';
import { CreateOrderModel } from '../../../models/order/createOrderModel';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUserDetail: UserDetail | undefined;
  cartItems: CartItem[] = [];
  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    public cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
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

  onPlaceOrderClick() {
    this.loading = true;
    const createOrderModel = new CreateOrderModel();
    for (let item of this.cartItems) {
      createOrderModel.orderBookItems.push({
        bookId: item.id,
        bookType: item.type,
        quantity: item.quantity,
      });
    }

    this.orderService.createOrder(createOrderModel).subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        this.cartService.emptyCart();
        this.toastr.success(`Order #${response.id} placed successfully`);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.toastr.error(err.error.errorMessage);
        console.log(err);
      },
    });
  }
}
