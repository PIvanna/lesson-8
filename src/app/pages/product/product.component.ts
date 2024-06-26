import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public showMoreRoli = false;
  showMoreButPoli(){
    this.showMoreRoli = true;
  }

  closeMoreButRoli(){
    this.showMoreRoli = false;
  }
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
    this.isCategoryRoli();
  }

  ngOnInit(): void {
  }

isCategoryRoli(): boolean {
    const currentPath = this.activatedRoute.snapshot.url.join('/');
    // Перевіряємо, чи поточний маршрут містить '/product/' і '/roli'
    return currentPath.includes('product/') && currentPath.includes('/roli');
  }



  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data.filter(product => product['category']?.path === categoryName) as IProductResponse[];
    })
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }

  public selectedPathPart: string | null = null;

  openAll() {
    this.selectedPathPart = null;

  }

  openFiladelfiya() {
    this.selectedPathPart = 'filadelfiya';
  }

  openKaliforniya() {
    this.selectedPathPart = 'kaliforniya';

  }

  openZapechenyj(){
    this.selectedPathPart = 'zapechenyj';
  }

  openFirmovi(){
    this.selectedPathPart = 'firmovi';
  }

  openMaki(){
    this.selectedPathPart = 'maki';
  }
  openPremium(){
    this.selectedPathPart = 'premium';
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
