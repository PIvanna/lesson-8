import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent {
  public currentDiscount!: IDiscountResponse; 

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentDiscount = response['discountInfo'];
    })
  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(id).subscribe(data => {
      this.currentDiscount = data;
    })
  }

  
}