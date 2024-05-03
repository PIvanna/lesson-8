import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open question 0 and close others when openQuestion is called with i=0', () => {
    component.openQuestion(0);
    expect(component.question0).toBeTrue();
    expect(component.question1).toBeFalse();
    expect(component.question2).toBeFalse();
    expect(component.question3).toBeFalse();
  });

  it('should close question 0 when closeQuestion is called with i=0', () => {
    component.question0 = true;
    component.closeQuestion(0);
    expect(component.question0).toBeFalse();
  });

  it('should close question 1 when closeQuestion is called with i=1', () => {
    component.question1 = true;
    component.closeQuestion(1);
    expect(component.question1).toBeFalse();
  });

  it('should close question 2 when closeQuestion is called with i=2', () => {
    component.question2 = true;
    component.closeQuestion(2);
    expect(component.question2).toBeFalse();
  });

  it('should close question 3 when closeQuestion is called with i=3', () => {
    component.question3 = true;
    component.closeQuestion(3);
    expect(component.question3).toBeFalse();
  });


});
