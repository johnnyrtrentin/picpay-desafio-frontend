import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'user-payment',
    loadChildren: () => import('./modules/user-payment/user-payment.module').then((m) => m.UserPaymentModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRountingModule {}
