import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostviewedComponent } from './mostviewed.component';

describe('MostviewedComponent', () => {
  let component: MostviewedComponent;
  let fixture: ComponentFixture<MostviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostviewedComponent ]
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
