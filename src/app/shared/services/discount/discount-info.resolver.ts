
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IDiscountResponse> {
    return this.discountService.getOne(route.paramMap.get('id')); 
  }
}