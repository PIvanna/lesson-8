import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMenuComponent } from './basket-menu.component';

describe('BasketMenuComponent', () => {
  let component: BasketMenuComponent;
  let fixture: ComponentFixture<BasketMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketMenuComponent]
    });
    fixture = TestBed.createComponent(BasketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
