import { Injectable } from "@angular/core";
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SignupService } from './signup.service';

@Injectable({ providedIn: 'root' })
export class UserNotTakenValidatorService {
    constructor(private signUpService: SignupService) {}

    checkUserNameTaken() {
        return (control: AbstractControl) =>
            control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => this.signUpService.checkUserName(userName)))
                .pipe(map (data => data ? { userNameTaken: true } : null ))
                .pipe(first());
    }
}
