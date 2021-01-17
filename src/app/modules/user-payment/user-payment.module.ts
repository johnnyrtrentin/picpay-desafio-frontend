import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserPaymentComponent } from './user-payment.component';
import { UserPaymentRoutingModule } from './user-payment.routing';

@NgModule({
    declarations: [UserPaymentComponent],
    imports: [SharedModule, UserPaymentRoutingModule],
    exports: [UserPaymentComponent]
})
export class UserPaymentModule {}
