import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

// Components
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { ListComponent } from './list/list.component'
import { UserComponent } from './user/user.component'
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';

// Icons
import { PayComponent } from './icons/pay/pay.component'
import { SuccessComponent } from './icons/success/success.component'
import { FailureComponent } from './icons/failure/failure.component'
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
      CardPipe
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
