import { TestBed, inject } from '@angular/core/testing';

import { BookDataService } from './book-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [BookDataService]
  }));

  it('should get book-related data', inject([HttpTestingController, BookDataService],
    (httpMock: HttpTestingController, bookService: BookDataService) => {
      expect(bookService).toBeTruthy();
    }
  )
  );
});
