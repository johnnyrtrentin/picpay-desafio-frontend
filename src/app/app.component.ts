import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AppService],
})
export class AppComponent implements OnInit {
    title = 'Desafio Picpay Front-end';
    users: User[];

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.appService.getUsers().subscribe((ResponseUsers: User[]) => {
            this.users = ResponseUsers;
        });
    }

    openModal(user: User) {
        this.appService.openModal(user);
    }
}
