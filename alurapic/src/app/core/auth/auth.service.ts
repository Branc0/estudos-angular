import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  authenticate(userName: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(`${API}/user/login`, { userName, password }, { observe: 'response' })
      .pipe(tap(data =>
        this.userService.setToken(data.headers.get('x-access-token'))
      ));
  }
}
