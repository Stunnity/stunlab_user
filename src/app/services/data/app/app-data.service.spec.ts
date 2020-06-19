import { TestBed, inject } from '@angular/core/testing';
import { AppDataService } from './app-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
describe('AppDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [AppDataService]
  }));



  it('should get app-related data', inject([HttpTestingController, AppDataService],
    (httpMock: HttpTestingController, appService: AppDataService) => {
      expect(appService).toBeTruthy();
    }
  )
  );
});
