import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {  checkCircle } from 'ngx-bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";

import { UserComponent } from "./user/user.component";
import { ModalComponent } from "../modal/modal.component";

const icons = {
    checkCircle
  };

export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
    declarations: [ UserComponent, ModalComponent ],
    exports: [ UserComponent, ModalComponent ],
    imports: [ 
        HttpClientModule, 
        FormsModule, 
        ReactiveFormsModule, 
        NgbModalModule, 
        CommonModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        NgxBootstrapIconsModule.pick(icons)  ],
    bootstrap: [ ModalComponent ],
    entryComponents: [ ModalComponent ]
})
export class UsersModule {}