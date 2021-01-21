import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { UsersState } from './users.state';
import { GetAllUsers } from './users.action';
import { UsersService } from '../services/users.service';

import * as usersMock from '../../../core/mocks/user.mock';

describe('UsersState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([UsersState])],
      providers: [
        { provide: UsersService, useValue: usersMock.userServiceMock },
      ],
    });

    store = TestBed.get(Store);
  });

  it('should return the default state values', () => {
    const usersStore = store.selectSnapshot((state) => state.users);
    expect(usersStore).toBeTruthy();
    expect(usersStore).toEqual(usersMock.defaultState);
  });

  it('should action store all the users in state', () => {
    store.dispatch(new GetAllUsers());

    const usersStore = store.selectSnapshot((state) => state.users);

    expect(usersStore).toBeTruthy();
    expect(usersStore).toEqual(usersMock.stateWithDispatchedValues);
  });

  it('should selector return all the users', () => {
    store.dispatch(new GetAllUsers());

    const getUsersSelector = store.selectSnapshot(UsersState.getUsers);

    expect(getUsersSelector).toBeTruthy();
    expect(getUsersSelector).toEqual([
      ...usersMock.stateWithDispatchedValues.users,
    ]);
  });
});
