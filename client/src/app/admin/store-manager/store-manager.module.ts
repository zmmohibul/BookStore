import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';


@NgModule({
  declarations: [
    CreateCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    StoreManagerRoutingModule
  ]
})
export class StoreManagerModule { }
