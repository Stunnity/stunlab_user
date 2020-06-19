import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebappLayoutComponent } from './webapp-layout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WebappLayoutComponent', () => {
  let component: WebappLayoutComponent;
  let fixture: ComponentFixture<WebappLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebappLayoutComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebappLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
