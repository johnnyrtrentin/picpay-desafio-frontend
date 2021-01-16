import { NgModule } from '@angular/core';
import { RegisterCardComponent } from './register-card.component';
import { RegisterCardRoutingModule } from './register-card.routing';

@NgModule({
  declarations: [RegisterCardComponent],
  imports: [RegisterCardRoutingModule],
  exports: [RegisterCardComponent],
})
export class RegisterCardModule {}
