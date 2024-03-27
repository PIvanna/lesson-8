import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public showMoreRoli = false;
  showMoreButPoli(){
    this.showMoreRoli = true;
  }

  closeMoreButRoli(){
    this.showMoreRoli = false;
  }
}
