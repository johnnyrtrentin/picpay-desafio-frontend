import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    SharedModule
  ],
  exports: [
    HeaderComponent,
    ContentComponent
  ]
})
export class CoreModule { }
