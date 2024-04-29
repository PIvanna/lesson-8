import { Component, ViewChild } from '@angular/core';
import { ROLE } from 'src/app/shared/constants/constants';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthdialogComponent } from '../authdialog/authdialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { BasketMenuComponent } from '../basket-menu/basket-menu.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PhoneComponent } from '../phone/phone.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', "../../shared/styles/_mixins.scss"]
})
export class HeaderComponent {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  public menuOpen = false;
  public basketOpen = false;
  public basketEmpty = true;
  public isLogin = false;
  public loginUrl = '';
  public menuUserOpen = false;
  menuUser() {
    if (this.loginUrl === "cabinet/user-info") {
      if (this.menuUserOpen == true) {
        this.menuUserOpen = false;
      } else {
        this.menuUserOpen = true;
      }
    }
  }

  openBasket() {


    this.basketOpen = this.basketOpen ? false : true;
  }

  closeBasket() {
    this.basketOpen = false;
  }



  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  public total = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUpdatesUserLogin();
    this.checkUserLogin();
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet/user-info';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
    }
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    window.location.reload();
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthdialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
    }) 
  }

  openBasketModal(): void {
    const dialogRef = this.dialog.open(BasketMenuComponent, {
      panelClass: 'basket-info',
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openPhoneModal(): void{
    const dialogRef = this.dialog.open(PhoneComponent, {
      panelClass: 'phone',
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
