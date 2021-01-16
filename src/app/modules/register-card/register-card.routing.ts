import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCardComponent } from './register-card.component';

const routes: Routes = [{ path: '', component: RegisterCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCardRoutingModule {}
