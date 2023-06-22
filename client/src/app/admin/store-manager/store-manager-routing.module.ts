import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { BookCreateComponent } from './book/book-create/book-create.component';
import { CreatePublisherComponent } from './publisher/create-publisher/create-publisher.component';
import { PublisherListComponent } from './publisher/publisher-list/publisher-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },

  { path: 'create-book', component: BookCreateComponent },

  { path: 'create-publisher', component: CreatePublisherComponent },
  { path: 'publisher-list', component: PublisherListComponent },

  { path: 'create-author', component: CreateAuthorComponent },
  { path: 'author-list', component: AuthorListComponent },
  { path: 'author-edit/:id', component: AuthorEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {}
