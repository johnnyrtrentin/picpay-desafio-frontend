import { AfterViewInit, Component } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from './users/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Desafio Picpay Front-end';
  users: User[]; 
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {        
    this.userService
    .getUsers()
    .subscribe((users: User[]) => this.users = users);
  }
}
