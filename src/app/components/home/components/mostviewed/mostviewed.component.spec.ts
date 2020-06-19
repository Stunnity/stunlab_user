import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostviewedComponent } from './mostviewed.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MostviewedComponent', () => {
  let component: MostviewedComponent;
  let fixture: ComponentFixture<MostviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MostviewedComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
