import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { AuthorFormComponent } from './author/author-form/author-form.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryTableComponent,
    AuthorFormComponent,
    CreateAuthorComponent,
    AuthorListComponent,
  ],
  imports: [CommonModule, StoreManagerRoutingModule, SharedModule],
})
export class StoreManagerModule {}
