import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { SignUpComponent } from './signup.component';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

describe('When user ', () => {
    let component: SignUpComponent;
    let router: Router;
    let signupService: SignupService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            providers: [SignupService, UserNotTakenValidatorService],
            imports: [
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        signupService = TestBed.get(SignupService);
        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('must be instantiated', () => {
        expect(component).toBeTruthy();
    });

    it('must sign up', () => {
        const navigateSpy = spyOn(router, 'navigate');
        const spy = spyOn(signupService, 'signUp').and.returnValue(of(null));
        component.signupForm.get('fullName').setValue('Nome Teste');
        component.signupForm.get('userName').setValue('testerUser');
        component.signupForm.get('email').setValue('teste@gmail.com');
        component.signupForm.get('password').setValue('1234');
        component.signUp();

        const newUser = {
            userName: 'testerUser',
            email: 'teste@gmail.com',
            fullName: 'Nome Teste',
            password: '1234'
        };

        expect(component.signupForm.getRawValue()).toEqual(newUser);
        expect(spy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
});
