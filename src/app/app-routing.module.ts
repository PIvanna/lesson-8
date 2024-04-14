import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { AboutComponent } from './pages/about/about.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { DiscountAddComponent } from './pages/discount-add/discount-add.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthorizationComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent , resolve: {
    discountInfo: DiscountInfoResolver 
  } },
  { path: 'product/:category', component: ProductComponent }, 
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'about', component: AboutComponent },
  { path: 'delivery-payment', component: DeliveryPaymentComponent },
  { path: 'discount-add', component: DiscountAddComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'order', component: OrderComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard], children: [
    { path: 'user-info', component: UserInfoComponent },
    { path: '', pathMatch: 'prefix', redirectTo: 'usrr-info' }
  ] },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard] ,children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'prefix', redirectTo: 'discount' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
