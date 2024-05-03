import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneComponent } from './phone.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('PhoneComponent', () => {
  let component: PhoneComponent;
  let fixture: ComponentFixture<PhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
