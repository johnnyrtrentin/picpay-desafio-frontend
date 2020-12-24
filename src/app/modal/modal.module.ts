import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxBootstrapIconsModule } from "ngx-bootstrap-icons";
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { checkCircle } from 'ngx-bootstrap-icons';
import { HttpClientModule } from "@angular/common/http";

import { ModalComponent } from "./modal.component";

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
  declarations: [ ModalComponent ],
  exports: [ ModalComponent ],
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    CommonModule,
    HttpClientModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxBootstrapIconsModule.pick(icons) 
  ],
  bootstrap: [ ModalComponent ],
  entryComponents: [ ModalComponent ]
})
export class ModalModule { }