import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRountingModule } from './app-routing.module';
import { StateModule } from './shared/state/state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRountingModule,
    CoreModule,
    SharedModule,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
