import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPaymentComponent } from './user-payment.component';

const routes: Routes = [{ path: '', component: UserPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPaymentRoutingModule {}
