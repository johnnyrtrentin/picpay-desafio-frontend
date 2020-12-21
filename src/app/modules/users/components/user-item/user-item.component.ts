import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: IUser;

  @Output() payEvent = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit() {
  }

  pay(user: IUser) {
    this.payEvent.next(user);
  }

}
