import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentComponent } from './layout/content/content.component';
import { HeaderComponent } from './layout/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UsersModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
