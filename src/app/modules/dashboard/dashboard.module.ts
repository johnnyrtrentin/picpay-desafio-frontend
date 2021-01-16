import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';


@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, MaterialModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
