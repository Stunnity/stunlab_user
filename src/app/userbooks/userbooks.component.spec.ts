import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbooksComponent } from './userbooks.component';

describe('UserbooksComponent', () => {
  let component: UserbooksComponent;
  let fixture: ComponentFixture<UserbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserbooksComponent ]
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
