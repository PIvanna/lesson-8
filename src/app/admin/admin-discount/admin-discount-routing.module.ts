import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminDiscountComponent} from "./admin-discount.component";

const routes: Routes = [
  {
    path: '', component: AdminDiscountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminDiscountRoutingModule { }
