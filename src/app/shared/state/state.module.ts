import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { UsersState } from './users/users.state';
import { environment } from 'src/environments/environment';
import { CreditCardState } from './credit-card/credit-card.state';
import { TransactionsState } from './transactions/transaction.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([UsersState, CreditCardState, TransactionsState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
        disabled: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule,
  ],
})
export class StateModule {}
