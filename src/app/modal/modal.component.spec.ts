import { HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { checkCircle } from 'ngx-bootstrap-icons';
import { NgxCurrencyModule } from 'ngx-currency';

import { Card } from 'src/models/card';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

const icons = {
    checkCircle
  };

describe('Modal Component', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ModalComponent],
          imports: [
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            NgbModalModule, 
            NgxCurrencyModule, 
            NgxBootstrapIconsModule.pick(icons) 
          ]
      }).compileComponents();
  }));

  it('Validade list of cards', inject([ModalService], (service: ModalService)  => {
      const cards: Card[] = [
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
        }
      ];
  
      expect(service.getCards()).toEqual(cards);
    })
  );

  it('Validate payment', inject([ModalService], (service: ModalService) => {
      expect(
          service.pay(1002, {
              value: '33.30',
              selectedCard: {
                  card_number: '1111111111111111',
                  cvv: 444,
                  expiry_date: '01/18',
              },
          })
      ).toBeTruthy();
  }));    
});