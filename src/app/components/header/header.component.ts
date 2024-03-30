import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', "../../shared/styles/_mixins.scss"]
})
export class HeaderComponent {
  public menuOpen = false;
  public basketOpen = false;
  public basketEmpty = true;
  openBasket(){


    this.basketOpen = this.basketOpen ? false : true;
  }

  closeBasket(){
    this.basketOpen = false;
  }

  openMenu(){
    this.menuOpen = true;
  }

  closeMenu(){
    this.menuOpen = false;
  }
  public total = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if(this.basket.length > 0){
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
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
  }

  delete(product: IProductResponse){
    const index = this.basket.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      this.updateLocalStorage();
    }
    if(this.basket.length == 0){
      this.basketEmpty = true;
    }
  }
}
