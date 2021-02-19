import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    userName: string = null;

    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    getUserName() {
        return this.userName;
    }

    private decodeAndNotify(): void {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userName = null;
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }
}

