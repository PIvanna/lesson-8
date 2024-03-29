import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public offsetX = 0;
  public itemWidth!: number;
  public activeSlideIndex: number = 0;
  public showAll = true;
  public selectedPathPart: string | null = null;
  public discountsImg: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2F5-tyj-v-podarunok-.jpg?alt=media&token=7adc46c8-6e29-4ff9-aec2-dc03ca3be477',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Frol-tyzhnya.jpg?alt=media&token=e5df63a8-effd-444e-ac49-0e63ef215a14',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fden-narodzhennya-.jpg?alt=media&token=b577cd08-951e-4132-b585-a7116ad63cab',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fmonokombo.jpg?alt=media&token=010077fc-bfc6-4671-9945-ca7d91a0adb5',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fsamovyviz.jpg?alt=media&token=b8685b3a-a784-455b-8c40-664a7ddc0f81',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Ffotomarafon-.jpg?alt=media&token=b57d07c5-cedd-43da-acaf-a08184a070b3'
  ];
  public countDiscount = this.discountsImg.slice(0, this.discountsImg.length - 1);
  public lastPoint = true;
  public showMore = false;
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.setItemWidth();
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  loadProducts(): void {
    const categoryName = 'roli';
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setItemWidth();
  }

  setItemWidth() {
    // Отримуємо ширину вікна браузера
    const windowWidth = window.innerWidth;
    // Встановлюємо ширину елемента як половину ширини вікна браузера
    this.itemWidth = windowWidth / 2;
  }

  moveSlide(index: number) {
    this.offsetX = -index * this.itemWidth;
    this.activeSlideIndex = index;
  }

  showMoreBut() {
    this.showMore = true;
  }

  closeMoreBut() {
    this.showMore = false;
  }

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
