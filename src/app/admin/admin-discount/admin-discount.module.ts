import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {AdminDiscountRoutingModule} from "./admin-discount-routing.module";
import {AdminDiscountComponent} from "./admin-discount.component";



@NgModule({
  declarations: [
    AdminDiscountComponent
  ],
  imports: [
    CommonModule,
    AdminDiscountRoutingModule,
    SharedModule
  ]
})
export class AdminDiscountModule { }
