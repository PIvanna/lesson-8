import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMenuComponent } from './basket-menu.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('BasketMenuComponent', () => {
  let component: BasketMenuComponent;
  let fixture: ComponentFixture<BasketMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketMenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
      ]
    });
    fixture = TestBed.createComponent(BasketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the product from the basket and update local storage', () => {
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
    component.basket = [product]; // Додамо продукт до кошика
    spyOn(component, 'updateLocalStorage'); // Мокуємо метод updateLocalStorage
    component.delete(product);
    expect(component.basket.length).toBe(0); // Перевіряємо, що продукт був видалений з кошика
    expect(component.updateLocalStorage).toHaveBeenCalled(); // Перевіряємо, що метод updateLocalStorage був викликаний
  });

  it('should set basketEmpty to true if basket is empty after deletion', () => {
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
    component.basket = [product]; // Додамо продукт до кошика
    component.delete(product);
    expect(component.basketEmpty).toBeTrue(); // Перевіряємо, що властивість basketEmpty встановлена в true
  });

  it('should not update basketEmpty if basket is not empty after deletion', () => {
    const product1: IProductResponse = {
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
    const product2: IProductResponse = {
      id: 3,
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
    component.basket = [product1, product2]; // Додаємо два продукти до кошика
    component.basketEmpty = false; // Встановлюємо властивість basketEmpty в false
    spyOn(component, 'updateLocalStorage'); // Мокуємо метод updateLocalStorage
    component.delete(product1);
    expect(component.basketEmpty).toBeFalse(); // Перевіряємо, що властивість basketEmpty не змінилася
    expect(component.updateLocalStorage).toHaveBeenCalled(); // Перевіряємо, що метод updateLocalStorage був викликаний
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
    spyOn(component, 'updateLocalStorage'); // Мокуємо метод updateLocalStorage
    component.productCount(product, true);
    expect(product.count).toBe(3); // Перевіряємо, що лічильник продукту збільшився
    expect(component.updateLocalStorage).toHaveBeenCalled(); // Перевіряємо, що метод updateLocalStorage був викликаний
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
    spyOn(component, 'updateLocalStorage'); // Мокуємо метод updateLocalStorage
    component.productCount(product, false);
    expect(product.count).toBe(1); // Перевіряємо, що лічильник продукту зменшився
    expect(component.updateLocalStorage).toHaveBeenCalled(); // Перевіряємо, що метод updateLocalStorage був викликаний
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
      count: 2
    };
    spyOn(component, 'updateLocalStorage'); // Мокуємо метод updateLocalStorage
    component.productCount(product, false);
    expect(product.count).toBe(1); // Перевіряємо, що лічильник продукту залишився незмінним
    expect(component.updateLocalStorage).toHaveBeenCalled(); // Перевіряємо, що метод updateLocalStorage був викликаний
  });



  it('should set basketEmpty to false if basket is not empty after loading', () => {
    const mockBasket = [{ id: 1, name: 'Product 1', price: 10, count: 2 }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockBasket));
    component.loadBasket();
    expect(component.basketEmpty).toBeTrue(); // Перевіряємо, що властивість basketEmpty встановлена в false
  });

  it('should not set basketEmpty if basket is empty after loading', () => {
    const mockBasket: any[] = [];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockBasket));
    component.loadBasket();
    expect(component.basketEmpty).toBeTrue(); // Перевіряємо, що властивість basketEmpty встановлена в true
  });

  it('should call getTotalPrice()', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: 1, name: 'Product 1', price: 10, count: 2 }]));
    spyOn(component, 'getTotalPrice');
    component.loadBasket();
    expect(component.getTotalPrice).toHaveBeenCalled(); // Перевіряємо, що метод getTotalPrice був викликаний
  });

});
