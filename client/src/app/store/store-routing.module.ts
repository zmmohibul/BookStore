import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserGuard } from '../guards/user.guard';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { OrdersHomeComponent } from './order/orders-home/orders-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'orders-home',
    component: OrdersHomeComponent,
    canActivate: [AuthGuard, UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
