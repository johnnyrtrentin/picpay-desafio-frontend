import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

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
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ]

  mainCard: string = this.cards[0].card_number.slice(-4)

  // errors: object = {transferValue: false, card: false}

  handleSubmit(paymentForm: NgForm) {

    if (paymentForm.invalid) {
      Object.keys(paymentForm.controls).forEach(key => {
        paymentForm.controls[key].markAsTouched()
      })
      return
    }
    console.log(paymentForm)
  }

}
