import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

// Components
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { ListComponent } from './list/list.component'
import { UserComponent } from './user/user.component'

// Icons
import { PayComponent } from './icons/pay/pay.component'

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UserComponent,
    PayComponent
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
