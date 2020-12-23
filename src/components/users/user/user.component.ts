import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from "src/components/modal/modal.component";
import { User } from "src/models/user";

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: [ './user.component.scss' ]
})
export class UserComponent implements OnInit {    
    @Input() user : User;

    constructor(
        public ngbModal: NgbModal
    ) { }

    ngOnInit() {       
    }

    openModal(user : User) {
        const modalRef = this.ngbModal.open(ModalComponent);
        modalRef.componentInstance.user = user;
        modalRef.result.then((result) => {
        if (result) {
            //console.log(result);
        }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }
}