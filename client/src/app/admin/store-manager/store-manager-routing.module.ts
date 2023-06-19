import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'create-author', component: CreateAuthorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {}
