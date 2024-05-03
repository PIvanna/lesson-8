import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';

import { DiscountInfoResolver } from './discount-info.resolver';
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

describe('DiscountInfoResolver', () => {
  let resolver: DiscountInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountInfoResolver],
      imports: [
        HttpClientModule // Додали HttpClientModule до imports
      ]
    });
    resolver = TestBed.inject(DiscountInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });


});
