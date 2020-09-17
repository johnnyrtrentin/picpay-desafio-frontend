import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/models/user';

@Component({
    selector: 'app-modal-payment',
    templateUrl: './modal-payment.component.html',
    styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent implements OnInit {

  
    constructor(public dialogRef: MatDialogRef<ModalPaymentComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
        console.log(data);
    }

    ngOnInit() {}

    // When the user clicks the action button a.k.a. the logout button in the\
    // modal, show an alert and followed by the closing of the modal
    actionFunction() {
        alert('You have logged out.');
        this.closeModal();
    }

    // If the user clicks the cancel button a.k.a. the go back button, then\
    // just close the modal
    closeModal() {
        this.dialogRef.close();
    }
}
