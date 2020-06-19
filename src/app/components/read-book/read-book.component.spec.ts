import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBookComponent } from './read-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReadBookComponent', () => {
  let component: ReadBookComponent;
  let fixture: ComponentFixture<ReadBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBookComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
