import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductComponent} from "./product.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProducrRoutingModule} from "./producr-routing.module";



@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    ProducrRoutingModule,
    SharedModule
  ]
})
export class ProductModule{ }
