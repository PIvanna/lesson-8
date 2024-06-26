import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {
  public showMoreRoli = false;

  public userDiscount: Array<IDiscountResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadDiscounts();
      }
    })
  }

  ngOnInit(): void {
  }



  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscount = data as IDiscountResponse[];
    })
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }


}
