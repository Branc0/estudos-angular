import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';

const API = 'http://localhost:3000';

@Injectable()
export class SignupService {
    constructor(private http: HttpClient) { }

    checkUserName(userName: string) {
        return this.http.get(`${API}/user/exists/${userName}`);
    }

    signUp(newUser: NewUser) {
        return this.http.post(API + '/user/signup', newUser);    }
}
