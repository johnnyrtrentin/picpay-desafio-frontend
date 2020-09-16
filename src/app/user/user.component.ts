import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input() user: object
  @Output() toggleModal = new EventEmitter<boolean>()
  @Output() selectUser = new EventEmitter<object>()

  onClick(user) {
    this.toggleModal.emit(true)
    this.selectUser.emit(user)
  }

}
