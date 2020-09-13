import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: {}
  selectedUser: {}
  modalVisible: boolean = false

  constructor(private http : HttpClient){
    this.http.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce').subscribe(response => {
      this.users = response
    })
  }

  identify(index, user) {
    return user.id
  }

  toggleModal() {
    this.modalVisible = !this.modalVisible
  }

  selectUser(user) {
    this.selectedUser = user
  }

  ngOnInit() {}

}
