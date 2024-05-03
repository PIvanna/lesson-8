import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should update count if product is already in basket', () => {
    const existingProduct: IProductResponse = {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqqq',
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 1
    };
    localStorage.setItem('basket', JSON.stringify([existingProduct]));
    component.addToBasket(existingProduct);
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    expect(basket.length).toBe(1); // Очікуємо, що в кошику є один товар
    expect(basket[0].id).toBe(1); // Очікуємо, що ID товару співпадає з доданим товаром
    expect(basket[0].count).toBe(2); // Очікуємо, що кількість товару в кошику стала 2, бо addToBasket збільшує кількість на 1
  });

  it('should increment product count if value is true', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqqq',
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    component.productCount(product, true);
    expect(product.count).toBe(3); // Очікуємо, що кількість товарів збільшилася на 1
  });

  it('should decrement product count if value is false and count is greater than 1', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqqq',
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    component.productCount(product, false);
    expect(product.count).toBe(1); // Очікуємо, що кількість товарів зменшилася на 1
  });

  it('should not decrement product count if value is false and count is 1', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqqq',
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 1
    };
    component.productCount(product, false);
    expect(product.count).toBe(1); // Очікуємо, що кількість товарів не змінилася, бо вона вже дорівнює 1
  });
  it('should set selectedPathPart to null when openAll is called', () => {
    component.openAll();
    expect(component.selectedPathPart).toBeNull();
  });

  it('should set selectedPathPart to "filadelfiya" when openFiladelfiya is called', () => {
    component.openFiladelfiya();
    expect(component.selectedPathPart).toBe('filadelfiya');
  });

  it('should set selectedPathPart to "kaliforniya" when openKaliforniya is called', () => {
    component.openKaliforniya();
    expect(component.selectedPathPart).toBe('kaliforniya');
  });

  it('should set selectedPathPart to "zapechenyj" when openZapechenyj is called', () => {
    component.openZapechenyj();
    expect(component.selectedPathPart).toBe('zapechenyj');
  });

  it('should set selectedPathPart to "firmovi" when openFirmovi is called', () => {
    component.openFirmovi();
    expect(component.selectedPathPart).toBe('firmovi');
  });

  it('should set selectedPathPart to "maki" when openMaki is called', () => {
    component.openMaki();
    expect(component.selectedPathPart).toBe('maki');
  });

  it('should set selectedPathPart to "premium" when openPremium is called', () => {
    component.openPremium();
    expect(component.selectedPathPart).toBe('premium');
  });

});
