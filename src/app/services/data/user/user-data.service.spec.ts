import { TestBed, inject } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [UserDataService]
  }));

  it('should get user-related data', inject([HttpTestingController, UserDataService],
    (httpMock: HttpTestingController, userService: UserDataService) => {
      expect(userService).toBeTruthy();
    }
  )
  );
});
