import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountComponent } from './discount.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
