import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { SharedModule } from '@shared/shared.module';
import { UserService } from '@core/services/user.service';
import { User } from '@core/model/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [ 
        UserListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return users', () => {
    const users: User[] = [{
      id: 1,
      name: 'string',
      img: 'string',
      username: 'string'
    }];
    
    const spyUserService = spyOn(userService, 'getUsers').and.returnValue(of(users));

    component.onLoadUsers();

    expect(spyUserService).toHaveBeenCalled();
    expect(component.users).toEqual(users);
    expect(component.loading).toEqual(false);
  });

  it('should return error', () => {
    const spyUserService = spyOn(userService, 'getUsers').and.returnValue(throwError({message: 'error'}));

    component.onLoadUsers();

    expect(spyUserService).toHaveBeenCalled();
    expect(component.loading).toEqual(false);
  });

  it('should select user', () => {
    const user: User = {
      id: 1,
      name: 'string',
      img: 'string',
      username: 'string'
    };
    const spySelect = spyOn(component.select, 'emit');

    component.selectUser(user);

    expect(spySelect).toHaveBeenCalledWith(user);
});
});
