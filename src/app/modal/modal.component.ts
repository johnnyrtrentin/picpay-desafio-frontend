import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

  @Input() isVisible: boolean
  @Output() toggleModal = new EventEmitter<boolean>()
  @Input() selectedUser: object

  formVisible: boolean = true
  alertStatus: object

  toggleForm($event) {
    this.formVisible = $event
  }

  setStatus($event) {
    this.alertStatus = $event
  }

  closeModal() {
    this.toggleModal.emit(false)
    this.toggleForm(true)
  }

}
