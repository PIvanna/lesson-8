import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { discountInfoResolver } from './discount-info.resolver';

describe('discountInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => discountInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
