import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from "src/app/modal/modal.component";
import { User } from "src/models/user";
import { UserService } from "./user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: [ './user.component.scss' ],
    providers: [UserService],
})
export class UserComponent implements OnInit {    
    @Input() user : User;
    users: User[];

    constructor(        
        public ngbModal: NgbModal
    ) { }

    ngOnInit() { }

    openModal(user : User) {
        const modalRef = this.ngbModal.open(ModalComponent);
        modalRef.componentInstance.user = user;                
    };  
}