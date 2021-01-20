import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NgxsModule } from '@ngxs/store';

import { CoreModule } from '../../core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { UserPaymentComponent } from 'src/app/modules/user-payment/user-payment.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user-payment',
      component: UserPaymentComponent,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        NgxsModule.forRoot(),
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [DashboardComponent, UserPaymentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transactionService be defined', () => {
    expect(component.transactionService).toBeDefined();
  });

  describe('Navigation Suit Test', () => {
    it('should navigate to user-payment url', async(
      inject([Router, Location], (router: Router, location: Location) => {
        const AllElementsWithRouteLink = fixture.debugElement.queryAll(By.css('a'));
        const paymentButton = AllElementsWithRouteLink[1].nativeElement;

        paymentButton.click();

        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/user-payment');
        });
      })
    ));

    it('should return to dashboard url', async(
      inject([Router, Location], (router: Router, location: Location) => {
        const AllElementsWithRouteLink = fixture.debugElement.queryAll(By.css('a'));
        const dashboardButton = AllElementsWithRouteLink[0].nativeElement;

        dashboardButton.click();

        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/dashboard');
        });
      })
    ));
  });
});
