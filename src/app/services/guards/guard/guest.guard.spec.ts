import { TestBed, async, inject } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferDataService } from '../../data/shared/transfer-data.service';

describe('GuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [TransferDataService, GuestGuard]
    });
  });

  it('should ...', inject([GuestGuard], (guard: GuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
