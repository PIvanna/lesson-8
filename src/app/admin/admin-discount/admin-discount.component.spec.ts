import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} }, // Постачальник для Storage
      ]
    });
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize category form', () => {
    component.initCategoryForm();
    expect(component.discountForm).toBeDefined(); // Перевіряємо, чи форма створена
    expect(component.discountForm.get('createdDate')).not.toBeNull(); // Перевіряємо, чи поле 'createdDate' не є нульовим
    expect(component.discountForm.get('date')).not.toBeNull(); // Перевіряємо, чи поле 'date' не є нульовим
    expect(component.discountForm.get('name')).not.toBeNull(); // Перевіряємо, чи поле 'name' не є нульовим
    expect(component.discountForm.get('title')).not.toBeNull(); // Перевіряємо, чи поле 'title' не є нульовим
    expect(component.discountForm.get('description')).not.toBeNull(); // Перевіряємо, чи поле 'description' не є нульовим
    expect(component.discountForm.get('imagePath')).not.toBeNull(); // Перевіряємо, чи поле 'imagePath' не є нульовим
  });


  it('should toggle bShowForm value correctly', () => {
    expect(component.bShowForm).toBeFalse();
    component.showForm();
    expect(component.bShowForm).toBeTrue();
    component.showForm();
    expect(component.bShowForm).toBeFalse();
  });





});
