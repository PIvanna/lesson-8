import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let formBuilder: FormBuilder;
  formBuilder = new FormBuilder();
  beforeEach(() => {
    formBuilder = new FormBuilder();
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.currentUser = {
      name: 'John',
      surname: 'Doe',
      number: '123456789',
      email: 'test@example.com',
      birthday: '2000-01-01'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize personalForm with currentUser data', () => {
    component.initPersonalForm();
    expect(component.personalForm).not.toBeNull();
    expect(component.personalForm.get('name')?.value).toEqual('John');
    expect(component.personalForm.get('surname')?.value).toEqual('Doe');
    expect(component.personalForm.get('phoneNumber')?.value).toEqual('123456789');
    expect(component.personalForm.get('email')?.value).toEqual('test@example.com');
    expect(component.personalForm.get('birthday')?.value).toEqual('2000-01-01');
  });



});
