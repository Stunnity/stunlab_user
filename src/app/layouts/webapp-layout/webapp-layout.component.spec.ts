import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebappLayoutComponent } from './webapp-layout.component';

describe('WebappLayoutComponent', () => {
  let component: WebappLayoutComponent;
  let fixture: ComponentFixture<WebappLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebappLayoutComponent ]
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
