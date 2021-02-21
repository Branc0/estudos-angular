import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '../user/user.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let component: HeaderComponent;
    let userService: UserService;
    let router: Router;

    // beforeEach assincrono para a criação do modulo
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            providers: [UserService],
        }).compileComponents();
    }));

    beforeEach(() => {
        userService = TestBed.get(UserService);
        router = TestBed.get(Router);
        spyOn(userService, 'getUser').and.returnValue(of({
            id: 1,
            name: 'tester',
            email: 'test@gmail.com'
        }));

        const fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('must be instatiated', () => {
        expect(component).toBeTruthy();
    });

    it('must logout', () => {
        const spy = spyOn(userService, 'logout').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');
        component.logout();
        // testando se ele está sendo chamado
        expect(spy).toHaveBeenCalled();
        // testando se ele está indo para rota em branco
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
});
