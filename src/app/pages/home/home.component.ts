import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public offsetX = 0;
  public itemWidth!: number;
  public activeSlideIndex: number = 0;
  public discountsImg: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2F5-tyj-v-podarunok-.jpg?alt=media&token=7adc46c8-6e29-4ff9-aec2-dc03ca3be477',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Frol-tyzhnya.jpg?alt=media&token=e5df63a8-effd-444e-ac49-0e63ef215a14',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fden-narodzhennya-.jpg?alt=media&token=b577cd08-951e-4132-b585-a7116ad63cab',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fmonokombo.jpg?alt=media&token=010077fc-bfc6-4671-9945-ca7d91a0adb5',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Fsamovyviz.jpg?alt=media&token=b8685b3a-a784-455b-8c40-664a7ddc0f81',
    'https://firebasestorage.googleapis.com/v0/b/monosushi-8418b.appspot.com/o/images%2Ffotomarafon-.jpg?alt=media&token=b57d07c5-cedd-43da-acaf-a08184a070b3'
  ];
  public countDiscount = this.discountsImg.slice(0, this.discountsImg.length-1);
  public lastPoint = true;
  public showMore = false;
  constructor() {
    this.setItemWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setItemWidth();
  }

  setItemWidth() {
    // Отримуємо ширину вікна браузера
    const windowWidth = window.innerWidth;
    // Встановлюємо ширину елемента як половину ширини вікна браузера
    this.itemWidth = windowWidth / 2;
  }

  moveSlide(index: number) {
    this.offsetX = -index * this.itemWidth;
    this.activeSlideIndex = index;
  }

  showMoreBut(){
    this.showMore = true;
  }

  closeMoreBut(){
    this.showMore = false;
  }
}
