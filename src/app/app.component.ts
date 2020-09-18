import { Component, OnInit } from '@angular/core';
import { User } from 'src/models';
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
    load: boolean = false;

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.load = true
        this.appService.getUsers().subscribe((ResponseUsers: User[]) => {
            this.users = ResponseUsers;
            this.load = false
        });
    }

    openModal(user: User) {
        this.appService.openModal(user);
    }
}
