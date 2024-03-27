import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public question = ["Як можна замовити, якщо наша адреса не входить у вашу зону доставки?",
    "Скільки часу очікувати на замовлення?",
    "Доставка безкоштовна?",
    "До якої години ви приймаєте замовлення?"]
  public activeopenQuestion!: number;
  public question0 = false;
  public question1 = false;
  public question2 = false;
  public question3 = false;

  openQuestion(i: number) {
    if (i === 0) {
      if (this.question0 === true) {
        this.question0 = false;
      }
      else {
        this.question0 = true;
        this.question2 = false;
        this.question3 = false;
        this.question1 = false;
      }
    } else if (i === 1) {
      if (this.question1 === true) {
        this.question1 = false;
      }
      else {
        this.question1 = true;
        this.question0 = false;
        this.question2 = false;
        this.question3 = false;
      }
    } else if (i === 2) {
      if (this.question2 === true) {
        this.question2 = false;
      }
      else {
        this.question2 = true;
        this.question0 = false;
        this.question1 = false;
        this.question3 = false;
      }
    } else {
      if (this.question3 === true) {
        this.question3 = false;
      }
      else {
        this.question3 = true;
        this.question0 = false;
        this.question2 = false;
        this.question1 = false;
      }
    }
  }

  closeQuestion(i: number) {
    if (i === 0) {
      this.question0 = false;
    } else if (i === 1) {
      this.question1 = false;
    } else if (i === 2) {
      this.question2 = false;
    } else {
      this.question3 = false;
    }
  }

}
