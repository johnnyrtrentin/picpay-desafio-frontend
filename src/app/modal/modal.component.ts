import { Component } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Card } from "src/models/card";
import { User } from "src/models/user";
import { Response } from "src/models/response";
import { ModalService } from "./modal.service";

export const formValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {    
  const invalidValue = control.get('value').value === '' || parseFloat(control.get('value').value) === 0.0;    
  const invalidSelectedCard = control.get('selectedCard').value === '';      
  
  const errorMessage = 'Campo obrigatório.';

  return invalidValue || invalidSelectedCard ? { invalidValue, invalidSelectedCard, errorMessage } : null
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {  
  user: User;
  cards: Card[];
  paymentForm: FormGroup;  
  loading: boolean = false;
  isValidForm: boolean = true;
  isApproved: boolean = false;
  isSubmited: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: ModalService
  ) 
  {     
    this.getCards();
    this.createForm();
  }

  private createForm() {
    this.paymentForm =  new FormGroup({
      value: new FormControl(''),
      selectedCard: new FormControl('')
   }, { validators: formValidation });
  }

  getCards() {
    let previousCard = [];

    this.modalService
    .getCards()    
    .map((card: Card) => {
        previousCard = [
            ...previousCard,
            { 
              ...card, 
              final: card.card_number.slice(-4) 
            },
        ];
    });
    return this.cards = previousCard;
  }

  pay(user: User){        
    if (this.paymentForm.errors) {
      this.isValidForm = false;
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.controls[key].markAsTouched()
      });
      return
    } 
    this.isValidForm = true;
    this.setPayment(user, this.paymentForm)
  }

  setPayment(user: User, paymentForm: FormGroup) {    
    this.isSubmited = true;
    this.loading = true;
    this.modalService
      .pay(user.id, paymentForm.value)
      .subscribe((response: Response) => {
        if (response.success) {
          if (response.status === 'Aprovada' && paymentForm.value.selectedCard.card_number == this.cards[0].card_number){
            this.isApproved = true;
          }
        } 
        this.loading = false;
      }, () => { this.isSubmited = false });
  }

  closeModal() {
    this.activeModal.close();
  }

}