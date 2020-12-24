import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';

import { UserService } from 'src/app/users/user/user.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
      imports: [HttpClientModule], 
    }).compileComponents();
  }));

  it('Validade list of users', inject([UserService], (service: UserService) => {
    expect(service.getUsers()).toBeTruthy();
  }));
});