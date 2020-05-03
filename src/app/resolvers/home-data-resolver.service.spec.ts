import { TestBed } from '@angular/core/testing';

import { HomeDataResolverService } from './home-data-resolver.service';

describe('HomeDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeDataResolverService = TestBed.get(HomeDataResolverService);
    expect(service).toBeTruthy();
  });
});
