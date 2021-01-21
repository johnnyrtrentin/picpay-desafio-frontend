import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

import * as userMock from '../../../core/mocks/user.mock';
import { HttpErrorResponse } from '@angular/common/http';

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(UsersService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    service.fetchUsers().subscribe((data) => {
      expect(data).toEqual(userMock.user);
    });

    const req = httpTestingController.expectOne(userMock.API_ENDPOINT_MOCK);
    expect(req.request.method).toBe('GET');
    req.flush(userMock.user);
  });

  it('shouldnt fetch all users', () => {
    service.fetchUsers().subscribe(
      () => fail('Request failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe('400 error');
      }
    );

    const req = httpTestingController.expectOne(userMock.API_ENDPOINT_MOCK);
    req.flush('400 error', { status: 400, statusText: 'Error 400' });
  });
});
