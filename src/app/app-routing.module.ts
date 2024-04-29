import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './pages/home/home.component';


import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'discount',
    loadChildren: () => import('../app/pages/discount/discount.module').then(m => m.DiscountModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('../app/pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'delivery-payment',
    loadChildren: () => import('../app/pages/delivery-payment/delivery-payment.module').then(m => m.DeliveryPaymentModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('../app/pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  {
    path: 'order',
    loadChildren: () => import('../app/pages/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../app/pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
