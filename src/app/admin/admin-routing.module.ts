import { NgModule } from '@angular/core';
import {AdminComponent} from "./admin.component";
import {AdminProductComponent} from "./admin-product/admin-product.component";
import {RouterModule, Routes} from "@angular/router";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'product', loadChildren: () => import('./admin-product/admin-product.module').then(m => m.AdminProductModule) },
      { path: 'discount', loadChildren: () => import('./admin-discount/admin-discount.module').then(m => m.AdminDiscountModule) },
      // { path: 'orders', component: AdminOrdersComponent },
      { path: 'category', loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule) },
      { path: '', pathMatch: 'prefix', redirectTo: 'discount' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
