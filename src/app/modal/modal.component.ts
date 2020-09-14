import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isVisible: boolean
  @Output() toggleModal = new EventEmitter<boolean>()
  @Input() selectedUser: object

  constructor() {}

  ngOnInit() {}

}
