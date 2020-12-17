import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  { 
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'payments',
    loadChildren: () => import('./modules/payments/payments.module').then((m) => m.PaymentsModule),
  },
  { 
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
