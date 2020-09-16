import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { LoaderComponent } from './loader/loader.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ]
})

export class SharedModule {}
