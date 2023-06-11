import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
