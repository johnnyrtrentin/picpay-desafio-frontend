import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { UserComponent } from "./user/user.component";

@NgModule({
    declarations: [ UserComponent ],
    exports: [ UserComponent ],
    imports: [ HttpClientModule ]
})
export class UsersModule {}