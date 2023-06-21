import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'create-author', component: CreateAuthorComponent },
  { path: 'author-list', component: AuthorListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {}
