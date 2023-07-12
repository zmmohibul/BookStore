import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'store-manager',
    loadChildren: () =>
      import('./store-manager/store-manager.module').then(
        (module) => module.StoreManagerModule
      ),
  },
  {
    path: 'order-manager',
    loadChildren: () =>
      import('./order-manager/order-manager.module').then(
        (module) => module.OrderManagerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
