import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookCardComponent } from './book/book-card/book-card.component';
import { SharedModule } from '../shared/shared.module';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { CategorySidebarComponent } from './book/category-sidebar/category-sidebar.component';

@NgModule({
  declarations: [HomeComponent, BookListComponent, BookCardComponent, BookDetailsComponent, CategorySidebarComponent],
  imports: [CommonModule, StoreRoutingModule, SharedModule],
})
export class StoreModule {}
