import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { UserComponent } from "./user/user.component";
import { ModalModule } from "../modal/modal.module";

@NgModule({
    declarations: [ UserComponent ],
    exports: [ UserComponent ],
    imports: [ 
        ModalModule,
        HttpClientModule,
        CommonModule
    ],
    bootstrap: [ UserComponent ],
    entryComponents: [ UserComponent ]
})
export class UsersModule {}