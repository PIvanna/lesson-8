import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { IUserInfo } from 'src/app/shared/interfaces/user-info/user-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  public orderForm!: FormGroup;
  public currentUser!: IUserInfo;
  public userDiscount: Array<IDiscountResponse> = [];
  private eventSubscription!: Subscription;
  public openOptionMenu = false;
  public option = "Обрати акцію";
  public householdCnt = '1';
  public openOptionMenuHousehold = false;
  public holdersOut = 'Навчальні тримачі';
  public household: Array<string> = [];
  public openOptionMenuHolders = false;
  public holders: string[] = [];
  public deliveryValue = "delivery";
  public inadvanceValue = false;
  public address: null | string = null;
  public openOptionMenuAddress = false;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private discountService: DiscountService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadDiscounts();
        console.log(this.userDiscount)
      }
    });
    this.initHousehold();
    this.initHolders();
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


  ngOnInit(): void {
    this.initPersonalForm();
    this.orderForm.valueChanges
      .pipe(distinctUntilChanged((prev, curr) => {
        return prev.delivery === curr.delivery && prev.inadvance === curr.inadvance;
      }))
      .subscribe((value) => {
        this.deliveryValue = value.delivery;
        this.inadvanceValue = value.inadvance;
        this.cdr.detectChanges();
        const dataControl = this.orderForm.get('data');
        const timeControl = this.orderForm.get('time');
        const streetControl = this.orderForm.get('street');
        const homeControl = this.orderForm.get('home');
        const entranceControl = this.orderForm.get('entrance');
        const apartmentControl = this.orderForm.get('apartment');
        const levelControl = this.orderForm.get('level');
        const doorphoneControl = this.orderForm.get('doorphone');
        const addressphoneControl = this.orderForm.get('address');
        if (this.inadvanceValue) {
          dataControl?.setValidators(Validators.required);
          timeControl?.setValidators(Validators.required);

        } else {
          timeControl?.clearValidators();
          dataControl?.clearValidators();
        }
        if (this.deliveryValue == 'delivery') {
          homeControl?.setValidators(Validators.required);
          streetControl?.setValidators(Validators.required);
          entranceControl?.setValidators(Validators.required);
          apartmentControl?.setValidators(Validators.required);
          levelControl?.setValidators(Validators.required);
          doorphoneControl?.setValidators(Validators.required);
          addressphoneControl?.clearValidators();

        } else if (this.deliveryValue == 'alone') {
          addressphoneControl?.setValidators(Validators.required);
          homeControl?.clearValidators();
          streetControl?.clearValidators();
          entranceControl?.clearValidators();
          apartmentControl?.clearValidators();
          levelControl?.clearValidators();
          doorphoneControl?.clearValidators();
        }
        homeControl?.updateValueAndValidity();
        dataControl?.updateValueAndValidity();
        timeControl?.updateValueAndValidity();
        levelControl?.updateValueAndValidity();
        doorphoneControl?.updateValueAndValidity();
        streetControl?.updateValueAndValidity();
        entranceControl?.updateValueAndValidity();
        apartmentControl?.updateValueAndValidity();
        addressphoneControl?.updateValueAndValidity();
      });
  }




  openOptionHousehold() {
    if (this.openOptionMenuHousehold == true) {
      this.openOptionMenuHousehold = false;
    } else {
      this.openOptionMenuHousehold = true;
    }
  }

  openOptionAddress(){
    if (this.openOptionMenuAddress == true) {
      this.openOptionMenuAddress = false;
    } else {
      this.openOptionMenuAddress = true;
    }
  }

  initHousehold() {
    let sum = 0;
    for (let i = 2; i < 21; i++) {
      if (i >= 6) {
        sum += 15;
        let str = `${i} +` + sum + ' ' + 'грн'
        this.household.push(str);
      } else {
        let str = `${i}`;
        this.household.push(str);
      }
    }
  }

  initHolders() {
    this.holders = [];
    for (let i = 0; i <= parseInt(this.householdCnt); i++) {
      this.holders.push(`${i}`);
    }
  }



  selectHousehold(cnt: string) {
    this.householdCnt = cnt;
    this.openOptionMenuHousehold = false;
    this.initHolders();
  }

  selectAdress(str: string) {
    this.orderForm.get('address')?.setValue(str);
    this.address = str;
    this.openOptionMenuAddress = false;
  }

  selectHolders(cnt: string) {
    this.holdersOut = cnt;
    this.openOptionMenuHolders = false;
  }

  openOption() {
    if (this.openOptionMenu == true) {
      this.openOptionMenu = false;
    } else {
      this.openOptionMenu = true;
    }
  }

  openOptionHolders() {
    if (this.openOptionMenuHolders == true) {
      this.openOptionMenuHolders = false;
    } else {
      this.openOptionMenuHolders = true;
    }
  }

  select(title: string) {

    this.option = title;
    this.openOptionMenu = false;
  }

  initPersonalForm(): void {
    this.orderForm = this.fb.group({
      promocod: [null],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      payment: ['cash', [Validators.required]],
      delivery: ['delivery', [Validators.required]],
      inadvance: [false, [Validators.required]],
      data: [null, this.inadvanceValue === true ? Validators.required : false],
      time: [null, this.inadvanceValue === true ? Validators.required : false],
      street: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      home: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      entrance: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      apartment: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      doorphone: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      level: [null, this.deliveryValue === 'delivery' ? Validators.required : false],
      address: [null, this.deliveryValue === 'alone' ? Validators.required : false],
      shouldPhone: [null],
      coment: [null],
      comentKitchen: [null],
    })
  }




  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscount = data as IDiscountResponse[];
    })
  }



  send() {
    // Перевірка чи форма валідна загалом
    if (this.orderForm.valid) {
      console.log('Форма відправлена успішно!');
    } else {
      // Перевірка кожного поля на валідність та наявність помилок
      Object.keys(this.orderForm.controls).forEach(field => {
        const control = this.orderForm.get(field);
        if (control && control.invalid) {
          console.log(`Поле ${field} не валідне. Помилки:`, control.errors);
        }
      });
    }
  }



}
