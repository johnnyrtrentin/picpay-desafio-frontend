import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

// Components
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { ListComponent } from './list/list.component'
import { UserComponent } from './user/user.component'
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { FormComponent } from './form/form.component';

// Icons
import { PayComponent } from './icons/pay/pay.component'
import { SuccessComponent } from './icons/success/success.component'
import { FailureComponent } from './icons/failure/failure.component'

// Pipes
import { CardPipe } from './card.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UserComponent,
    PayComponent,
    ModalComponent,
    AlertComponent,
    SuccessComponent,
    FailureComponent,
    CardPipe,
    FormComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
