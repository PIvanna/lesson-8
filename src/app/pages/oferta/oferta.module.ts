import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {OfertaComponent} from "./oferta.component";
import {OfertaRoutingModule} from "./oferta-routing.module";



@NgModule({
  declarations: [
    OfertaComponent
  ],
  imports: [
    CommonModule,
    OfertaRoutingModule,
    SharedModule
  ]
})
export class OfertaModule { }
