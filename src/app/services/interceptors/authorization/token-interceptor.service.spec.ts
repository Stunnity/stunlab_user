import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { Injector } from '@angular/core';

describe('TokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Injector
    ]
  }));

  it('should be created', () => {
    const service: TokenInterceptorService = TestBed.get(TokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
