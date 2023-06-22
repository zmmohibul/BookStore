import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { AuthorFormComponent } from './author/author-form/author-form.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookCreateComponent } from './book/book-create/book-create.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryTableComponent,
    AuthorFormComponent,
    CreateAuthorComponent,
    AuthorListComponent,
    AuthorEditComponent,
    BookFormComponent,
    BookCreateComponent,
  ],
  imports: [CommonModule, StoreManagerRoutingModule, SharedModule],
})
export class StoreManagerModule {}
