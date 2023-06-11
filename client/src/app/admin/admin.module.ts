import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [AdminRoutingModule, SharedModule],
})
export class AdminModule {}
