import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let mockProduct: IProductResponse;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockProduct = {
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
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle bShowForm correctly', () => {
    component.bShowForm = false;
    component.showForm(); // Перший виклик
    expect(component.bShowForm).toBe(true); // Після першого виклику, bShowForm має бути true
    component.showForm(); // Другий виклик
    expect(component.bShowForm).toBe(false); // Після другого виклику, bShowForm має бути false
  });

  it('should initialize product form correctly', () => {
    component.initProductForm();
    expect(component.productForm).not.toBeNull(); // Перевіряємо, що форма не є null
    expect(component.productForm.get('category')).not.toBeNull(); // Перевіряємо, що поле 'category' не є null
    expect(component.productForm.get('name')).not.toBeNull(); // Перевіряємо, що поле 'name' не є null
    expect(component.productForm.get('path')).not.toBeNull(); // Перевіряємо, що поле 'path' не є null
    expect(component.productForm.get('description')).not.toBeNull(); // Перевіряємо, що поле 'description' не є null
    expect(component.productForm.get('weight')).not.toBeNull(); // Перевіряємо, що поле 'weight' не є null
    expect(component.productForm.get('price')).not.toBeNull(); // Перевіряємо, що поле 'price' не є null
    expect(component.productForm.get('imagePath')).not.toBeNull(); // Перевіряємо, що поле 'imagePath' не є null
    expect(component.productForm.get('count')).not.toBeNull(); // Перевіряємо, що поле 'count' не є null
  });

  it('should set product form values and variables correctly', () => {
    component.editProduct(mockProduct);
    expect(component.productForm.value).toEqual({
      category: mockProduct.category,
      name: mockProduct.name,
      path: mockProduct.path,
      description: mockProduct.description,
      weight: mockProduct.weight,
      price: mockProduct.price,
      imagePath: mockProduct.imagePath,
      count: mockProduct.count
    });
    expect(component.isUploaded).toBeTrue();
    expect(component.editStatus).toBeTrue();
    expect(component.bShowForm).toBeTrue();
    expect(component.currentProductId).toEqual(mockProduct.id);
  });
});
