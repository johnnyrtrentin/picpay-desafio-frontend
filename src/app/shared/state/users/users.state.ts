import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IUsers, UsersStateModel } from '../models/users.interface';
import { UsersService } from '../services/users.service';
import { GetAllUsers } from './users.action';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: []
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static getUsers(state: UsersStateModel): IUsers[] {
    return state.users;
  }

  @Action(GetAllUsers)
  getAllusers({
    setState,
    getState,
  }: StateContext<UsersStateModel>): Observable<IUsers[]> {
    return this.usersService.fetchUsers().pipe(
      tap((users) => {
        const state = getState();
        setState({ ...state, users });
      })
    );
  }
}
