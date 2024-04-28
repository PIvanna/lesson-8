import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-menu',
  templateUrl: './basket-menu.component.html',
  styleUrls: ['./basket-menu.component.scss']
})
export class BasketMenuComponent {
  public basketEmpty = true;
  public total = 0;
  public basket: Array<IProductResponse> = [];
  
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.basket.length > 0) {
        this.basketEmpty = false;
      }
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
  }

  delete(product: IProductResponse) {
    const index = this.basket.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      this.updateLocalStorage();
    }
    if (this.basket.length == 0) {
      this.basketEmpty = true;
    }
  }

}
