import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material';

import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      MatDialogModule
    ]
  }));

  it('should be created', () => {
    const service: PaymentsService = TestBed.get(PaymentsService);
    expect(service).toBeTruthy();
  });
});
