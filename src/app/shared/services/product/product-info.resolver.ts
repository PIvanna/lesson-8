import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IProductResponse> {
    return this.productService.getOne(route.paramMap.get('id')); 
  }
}
