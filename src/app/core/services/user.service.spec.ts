import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '@core/model/user';
import { throwError } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {

  const BASE_API_URL = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';
  let service: UserService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', (done) => {
    const users: User[] = [{
      id: 1,
      name: 'string',
      img: 'string',
      username: 'string'
    }];

    service.getUsers().subscribe(data => {
      expect(data).toBe(users);
      done();
    });

    const req = httpTestingController.expectOne(BASE_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('should return error', (done) => {
    service.getUsers().subscribe(
      () => fail('Should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.error).toContain('400 error');
        done();
      }
    );

    const req = httpTestingController.expectOne(BASE_API_URL);
    req.flush('400 error', { status: 400, statusText: 'Error 400' });
  });
});
