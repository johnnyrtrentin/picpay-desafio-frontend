import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

    constructor(private httpClient: HttpClient) {}
 
    get(): Observable<IUser[]> {
      return this.httpClient.get<IUser[]>(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`)
    } 
}
