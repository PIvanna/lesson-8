
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IDiscountResponse> {
    const discountId = route.paramMap.get('id');
    if (!discountId) {
      // Return an empty observable if the productId is null or undefined
      return new Observable<IDiscountResponse>();
    }

    return this.discountService.getOneFirebase(discountId).pipe(
      map((data: any) => {
        // Assuming data contains necessary properties like id, name, etc.
        return {
          id: data.id,
          date: data.date,
          name: data.name,
          title: data.title,
          description: data.description,
          imagePath: data.imagePath
        } as IDiscountResponse;
      })
    );
  }
}
