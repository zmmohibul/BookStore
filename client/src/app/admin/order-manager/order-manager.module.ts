import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagerRoutingModule } from './order-manager-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [HomeComponent, OrdersComponent],
  imports: [CommonModule, OrderManagerRoutingModule, SharedModule],
})
export class OrderManagerModule {}
