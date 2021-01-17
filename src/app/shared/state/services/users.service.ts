import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUsers } from '../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_ENDPOINT = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all the users from the api
   */
  fetchUsers(): Observable<IUsers[]> {
    return this.http
      .get<IUsers[]>(this.API_ENDPOINT)
      .pipe(catchError((err) => throwError(err)));
  }
}
