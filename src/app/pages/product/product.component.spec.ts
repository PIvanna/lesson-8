import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let product: IProductResponse;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(ProductComponent);
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
      count: 1
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

  it('should set selectedPathPart to filadelfiya', () => {
    component.openFiladelfiya();
    expect(component.selectedPathPart).toEqual('filadelfiya');
  });

  it('should set selectedPathPart to kaliforniya', () => {
    component.openKaliforniya();
    expect(component.selectedPathPart).toEqual('kaliforniya');
  });

  it('should set selectedPathPart to zapechenyj', () => {
    component.openZapechenyj();
    expect(component.selectedPathPart).toEqual('zapechenyj');
  });

  it('should set selectedPathPart to firmovi', () => {
    component.openFirmovi();
    expect(component.selectedPathPart).toEqual('firmovi');
  });

  it('should set selectedPathPart to maki', () => {
    component.openMaki();
    expect(component.selectedPathPart).toEqual('maki');
  });

  it('should set selectedPathPart to premium', () => {
    component.openPremium();
    expect(component.selectedPathPart).toEqual('premium');
  });

});
