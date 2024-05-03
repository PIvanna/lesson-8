import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IProductResponse} from "../../../shared/interfaces/product/product.interface";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let product: IProductResponse;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      category: {
        id: 1,
        name: 'Category 1',
        path: 'path/to/category',
        imagePath: 'path/to/image'
      },
      path: 'path/to/product',
      description: 'Product description',
      weight: '100g',
      imagePath: 'path/to/image',
      count: 1 // Initial count
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment product count if value is true', () => {
    component.productCount(product, true);
    expect(product.count).toBe(2);
  });

  it('should decrement product count if value is false and count is greater than 1', () => {
    product.count = 2;
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });

  it('should not decrement product count if value is false and count is 1', () => {
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });
});
