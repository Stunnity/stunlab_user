import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageLayoutComponent } from './webpage-layout.component';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('WebpageLayoutComponent', () => {
  let component: WebpageLayoutComponent;
  let fixture: ComponentFixture<WebpageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [WebpageLayoutComponent],
      providers: [AppDataService, TransferDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
