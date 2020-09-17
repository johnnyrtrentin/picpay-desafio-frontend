import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPaymentStatusComponent } from './modal-payment-status.component';

describe('ModalPaymentStatusComponent', () => {
  let component: ModalPaymentStatusComponent;
  let fixture: ComponentFixture<ModalPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPaymentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
