import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbooksComponent } from './userbooks.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserbooksComponent', () => {
  let component: UserbooksComponent;
  let fixture: ComponentFixture<UserbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserbooksComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
