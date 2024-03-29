import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
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
    console.log(currentPath)
    return currentPath.includes('product/') && currentPath.includes('/roli');
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
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
}
