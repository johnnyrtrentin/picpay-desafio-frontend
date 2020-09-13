import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: object
  @Output() toggleModal = new EventEmitter<boolean>()
  @Output() selectUser = new EventEmitter<object>()

  constructor() {}

  onClick(user) {
    this.toggleModal.emit(true)
    this.selectUser.emit(user)
  }

  ngOnInit() {}

}
