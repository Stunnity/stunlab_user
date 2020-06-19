import { TestBed } from '@angular/core/testing';

import { TransferDataService } from './transfer-data.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransferDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [

      RouterTestingModule
    ],
    providers: [TransferDataService, CookieService]
  }));

  it('should be created', () => {
    const service: TransferDataService = TestBed.get(TransferDataService);
    expect(service).toBeTruthy();
  });
});
