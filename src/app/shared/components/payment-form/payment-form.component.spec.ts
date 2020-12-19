import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatDialogModule, 
  MatDialogRef, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule, 
  MAT_DIALOG_DATA 
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCurrencyModule } from 'ngx-currency';

import { PaymentFormComponent } from './payment-form.component';


describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  const paymentForm = {
    user: {},
    creditCards: []
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [ 
        PaymentFormComponent
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: paymentForm
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
