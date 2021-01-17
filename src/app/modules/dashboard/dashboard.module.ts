import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';


@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
