import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/components/users/user/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Desafio Picpay Front-end';
  users: User[]; 
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
        .getUsers()
        .subscribe(users => this.users = users);
  }
}
