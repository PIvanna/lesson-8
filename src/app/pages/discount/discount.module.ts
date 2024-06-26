import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {DiscountComponent} from "./discount.component";
import {DiscountRoutingModule} from "./discount-routing.module";
import {DiscountInfoComponent} from "./discount-info/discount-info.component";



@NgModule({
  declarations: [
    DiscountComponent,
    DiscountInfoComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    SharedModule
  ]
})
export class DiscountModule{ }
