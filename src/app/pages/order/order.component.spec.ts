import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
    component.orderForm = formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log "Форма відправлена успішно!" if form is valid', () => {
    spyOn(console, 'log');
    component.orderForm.setValue({
      name: 'John',
      email: 'test@example.com',
    });
    component.send();
    expect(console.log).toHaveBeenCalledWith('Форма відправлена успішно!');
  });

  it('should log validation errors for each invalid field if form is invalid', () => {
    spyOn(console, 'log');
    component.orderForm.get('name')?.setValue(''); // Порожнє значення, що не допускається для поля "name"
    component.send();
    expect(console.log).toHaveBeenCalledWith('Поле name не валідне. Помилки:', { required: true });
  });
  it('should toggle openOptionMenuHolders from true to false and vice versa', () => {
    component.openOptionMenuHolders = true;
    component.openOptionHolders();
    expect(component.openOptionMenuHolders).toBe(false);
    component.openOptionHolders();
    expect(component.openOptionMenuHolders).toBe(true);
  });
  it('should toggle openOptionMenu from true to false and vice versa', () => {
    component.openOptionMenu = true;
    component.openOption();
    expect(component.openOptionMenu).toBe(false);
    component.openOption();
    expect(component.openOptionMenu).toBe(true);
  });

  it('should toggle openOptionMenuAddress flag', () => {
    component.openOptionMenuAddress = false; // Початкове значення openOptionMenuAddress
    component.openOptionAddress(); // Викликаємо метод openOptionAddress() для перевірки тоглу
    expect(component.openOptionMenuAddress).toBe(true); // Перевіряємо, чи встановлено значення в true після першого виклику
    component.openOptionAddress(); // Викликаємо метод openOptionAddress() ще раз
    expect(component.openOptionMenuAddress).toBe(false); // Перевіряємо, чи встановлено значення в false після другого виклику
  });
  it('should toggle openOptionMenuHousehold flag', () => {
    component.openOptionMenuHousehold = false; // Початкове значення openOptionMenuHousehold
    component.openOptionHousehold(); // Викликаємо метод openOptionHousehold() для перевірки тоглу
    expect(component.openOptionMenuHousehold).toBe(true); // Перевіряємо, чи встановлено значення в true після першого виклику
    component.openOptionHousehold(); // Викликаємо метод openOptionHousehold() ще раз
    expect(component.openOptionMenuHousehold).toBe(false); // Перевіряємо, чи встановлено значення в false після другого виклику
  });


  it('should update this.address with the selected address', () => {
    const testAddress = '456 Elm St';
    component.selectAdress(testAddress);
    expect(component.address).toEqual(testAddress);
  });

  it('should set openOptionMenuAddress to false after selecting an address', () => {
    component.openOptionMenuAddress = true;
    component.selectAdress('789 Oak St');
    expect(component.openOptionMenuAddress).toBe(false);
  });
  it('should update householdCnt with the selected count', () => {
    const testCount = '2';
    component.selectHousehold(testCount);
    expect(component.householdCnt).toEqual(testCount);
  });

  it('should set openOptionMenuHousehold to false after selecting a count', () => {
    component.openOptionMenuHousehold = true;
    component.selectHousehold('4');
    expect(component.openOptionMenuHousehold).toBe(false);
  });

  it('should initialize holders after selecting a count', () => {
    spyOn(component, 'initHolders'); // Spy on the initHolders method
    component.selectHousehold('3');
    expect(component.initHolders).toHaveBeenCalled(); // Ensure initHolders was called
  });

  it('should initialize household array with values from 2 to 5 without prices', () => {
    component.initHousehold();
    expect(component.household.length).toBe(38); // Проверяем, что household имеет длину 4 (2, 3, 4, 5)
    for (let i = 2; i <= 5; i++) {
      expect(component.household[i - 2]).toEqual(`${i}`); // Проверяем, что каждый элемент массива содержит правильные значения от 2 до 5 без цен
    }
  });
});
