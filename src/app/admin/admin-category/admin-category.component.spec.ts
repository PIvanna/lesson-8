import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from "../../shared/services/category/category.service";

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        CategoryService,
        FormBuilder// Постачальник для Storage
      ],

      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle bShowForm from false to true', () => {
    component.bShowForm = false;
    component.showForm();
    expect(component.bShowForm).toBe(true);
  });

  it('should toggle bShowForm from true to false', () => {
    component.bShowForm = true;
    component.showForm();
    expect(component.bShowForm).toBe(false);
  });

  it('should toggle bShowForm from true to false and vice versa', () => {
    component.bShowForm = true;
    component.showForm();
    expect(component.bShowForm).toBe(false);
    component.showForm();
    expect(component.bShowForm).toBe(true);
  });

  it('should initialize categoryForm with default values', () => {
    component.initCategoryForm();
    expect(component.categoryForm.get('name')?.value).toBe(null);
    expect(component.categoryForm.get('path')?.value).toBe(null);
    expect(component.categoryForm.get('imagePath')?.value).toBe(
      'https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ajbic74qfau00-scaled-697x379.jpg'
    );
  });


  it('should edit category', () => {
    const category = {
      id: 1,
      name: 'Category 1',
      path: 'path/to/category',
      imagePath: 'path/to/image'
    };
    component.categoryForm = formBuilder.group({
      name: [''],
      path: [''],
      imagePath: ['']
    });
    component.editCategory(category);
    expect(component.categoryForm.value).toEqual({
      name: 'Category 1',
      path: 'path/to/category',
      imagePath: 'path/to/image'
    });
    expect(component.bShowForm).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.currentDiscountId).toBe(1); // Assuming id property is used as the currentDiscountId
    expect(component.isUploaded).toBe(true);
  });


});
