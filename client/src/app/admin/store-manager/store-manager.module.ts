import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CreateCategoryComponent, CategoryListComponent],
  imports: [CommonModule, StoreManagerRoutingModule, SharedModule],
})
export class StoreManagerModule {}
