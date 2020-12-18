import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { User } from '@core/model/user';

export const BASE_API_URL = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(BASE_API_URL)
    .pipe(
      take(1),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
