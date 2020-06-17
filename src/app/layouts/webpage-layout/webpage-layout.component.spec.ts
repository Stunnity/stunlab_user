import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageLayoutComponent } from './webpage-layout.component';

describe('WebpageLayoutComponent', () => {
  let component: WebpageLayoutComponent;
  let fixture: ComponentFixture<WebpageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageLayoutComponent ]
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
