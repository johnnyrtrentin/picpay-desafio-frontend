import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from '@core/model/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() select = new EventEmitter<User>();
  users: User[];
  loading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.onLoadUsers();
  }

  onLoadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.loading = false;
    }, () => {
      this.loading = false; 
    });
  }

  selectUser(user: User) {
    this.select.emit(user);
  }

}
