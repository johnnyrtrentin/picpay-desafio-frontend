import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './page/user.component';
import { UserItemComponent } from './page/user-item/user-item.component';
import { UserRoutingModule} from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserComponent, 
    UserItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
