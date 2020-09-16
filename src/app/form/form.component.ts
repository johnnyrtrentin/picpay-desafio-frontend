import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {

  @Input() userId: number
  @Output() toggleForm = new EventEmitter<boolean>()
  @Output() setStatus = new EventEmitter<object>()

  currencyMask = {
    align: "left",
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    thousands: ".",
    nullable: true
  }

  cards = [
    // Valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // Invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ]

  mainCard: string = this.cards[0].card_number.slice(-4)

  constructor(private http: HttpClient) {}

  makePayment({ userId, transferValue, selectedCard }) {
    const { card_number, cvv, expiry_date } = this.cards.find(card => (
      card.card_number.slice(-4) === selectedCard
    ))

    this.http.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', {
      card_number: card_number,
      cvv: cvv,
      expiry_date: expiry_date,
      destination_user_id: userId,
      value: transferValue
    }).subscribe((data) => {
      // Mockup logic
      const validCard = '1111111111111111'
      if (card_number === validCard) {
        this.setStatus.emit({
          success: true,
          message: 'O pagamento foi concluído com sucesso!'
        })
        this.toggleForm.emit(false)
      } else {
        this.setStatus.emit({
          success: false,
          message: 'O pagamento não foi concluído com sucesso.'
        })
        this.toggleForm.emit(false)
      }
    })
  }

  handleSubmit(paymentForm: NgForm) {
    if (paymentForm.invalid) {
      Object.keys(paymentForm.controls).forEach(key => {
        paymentForm.controls[key].markAsTouched()
      })
      return
    }

    this.makePayment(paymentForm.value)
  }

}
