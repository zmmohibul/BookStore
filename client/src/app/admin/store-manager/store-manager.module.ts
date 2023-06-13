import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryTableComponent } from './category/category-table/category-table.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryTableComponent],
  imports: [CommonModule, StoreManagerRoutingModule, SharedModule],
})
export class StoreManagerModule {}
