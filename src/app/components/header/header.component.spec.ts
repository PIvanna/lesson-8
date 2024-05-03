import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {ROLE} from "../../shared/constants/constants";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
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
        imagePath:'string',
        count: 2
      }
    ]
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('should update basket when order service emits changeBasket event', () => {
    const FAKE_BASKET = [
      {
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
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'loadBasket');
    component.loadBasket()
    expect(component.loadBasket).toHaveBeenCalled();
  });

  it('should toggle menuUserOpen when loginUrl is "cabinet/user-info"', () => {
    component.loginUrl = 'cabinet/user-info';
    component.menuUserOpen = true;
    component.menuUser();
    expect(component.menuUserOpen).toBe(false);
    component.menuUser();
    expect(component.menuUserOpen).toBe(true);
  });

  it('should not toggle menuUserOpen when loginUrl is not "cabinet/user-info"', () => {
    component.loginUrl = 'some/other/url';
    component.menuUserOpen = true;
    component.menuUser();
    expect(component.menuUserOpen).toBe(true);
  });

  it('should set isLogin and loginUrl correctly for ADMIN role', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'ADMIN' }));
    component.checkUserLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('admin');
  });

  it('should set isLogin and loginUrl correctly for USER role', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'USER' }));
    component.checkUserLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('cabinet/user-info');
  });

  it('should set isLogin and loginUrl correctly for unknown role', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'UNKNOWN_ROLE' }));
    component.checkUserLogin();
    expect(component.isLogin).toBe(false);
    expect(component.loginUrl).toBe('');
  });

  it('should set isLogin and loginUrl correctly when no currentUser is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.checkUserLogin();
    expect(component.isLogin).toBe(false);
    expect(component.loginUrl).toBe('');
  });

  it('should set isLogin to true and loginUrl to "admin" if currentUser is admin', () => {
    const currentUser = { role: ROLE.ADMIN };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toBe('admin');
  });

  it('should set isLogin to true and loginUrl to "cabinet/user-info" if currentUser is user', () => {
    const currentUser = { role: ROLE.USER };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toBe('cabinet/user-info');
  });

  it('should set isLogin to false and loginUrl to "" if currentUser is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.checkUserLogin();
    expect(component.isLogin).toBeFalse();
    expect(component.loginUrl).toBe('');
  });

  it('should set isLogin to false and loginUrl to "" if currentUser role is invalid', () => {
    const currentUser = { role: 'INVALID_ROLE' }; // Assume an invalid role
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeFalse();
    expect(component.loginUrl).toBe('');
  });
  it('should set menuOpen to true', () => {
    component.openMenu();
    expect(component.menuOpen).toBe(true); // Перевіряємо, чи menuOpen встановлено на true після виклику openMenu
  });
  it('should set menuOpen to false', () => {
    component.closeMenu();
    expect(component.menuOpen).toBe(false); // Перевіряємо, чи menuOpen встановлено на false після виклику closeMenu
  });
});
