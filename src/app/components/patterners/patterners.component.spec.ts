import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternersComponent } from './patterners.component';

describe('PatternersComponent', () => {
  let component: PatternersComponent;
  let fixture: ComponentFixture<PatternersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
