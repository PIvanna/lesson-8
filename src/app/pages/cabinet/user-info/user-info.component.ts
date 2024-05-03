import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/shared/interfaces/user-info/user-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public personalForm!: FormGroup;
  public currentUser: IUserInfo = {
    name: '',
    surname: '',
    number: '',
    email: '',
    birthday: ''
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.login();
  }

  ngOnInit(): void {
    this.initPersonalForm();
  }

  initPersonalForm(): void {
    this.personalForm = this.fb.group({
      name: [this.currentUser.name, [Validators.required]],
      surname: [this.currentUser.surname, [Validators.required]],
      phoneNumber: [this.currentUser.number, [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      birthday: [this.currentUser.birthday, [Validators.required]]
    })
  }

  login(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if(currentUserString){
      this.currentUser = JSON.parse(currentUserString);
      this.currentUser.birthday = null;
      console.log(this.currentUser.number)
    } else{
      this.currentUser.name = null;
      this.currentUser.surname = null;
      this.currentUser.number = null;
      this.currentUser.email = null;
      this.currentUser.birthday = null;
    }

  }

  saveChange() {

  }

  addAddress() {

  }
}
