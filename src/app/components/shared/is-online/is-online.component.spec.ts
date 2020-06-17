import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsOnlineComponent } from './is-online.component';

describe('IsOnlineComponent', () => {
  let component: IsOnlineComponent;
  let fixture: ComponentFixture<IsOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
