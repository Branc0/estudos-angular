import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing/';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

describe('FooterComponent', () => {
    // criamos a variavél que irá receber o componente no escopo geral
    // para que ela seja acessada dentro dos testes
    let component: FooterComponent;
    let userService: UserService;
    let fixture: ComponentFixture<FooterComponent>;
    // utilizamos dos beforeEach, porque o processo de fixture e criação de componente 
    // demora, então pra não atrasar os testes fazemos ele de forma assincrona

    // beforeEach Assincrono com TestBed isolado
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            // declaramos o nosso component
            declarations: [FooterComponent],
            // para que os RoutersLink funcionem corretamente
            imports: [RouterTestingModule],
            // nesse caso temos o nosso userService sendo utilizado
            // no método construtor, então temos que importa-los
            providers: [UserService],
        }).compileComponents();
    }));

    beforeEach(() => {
        // Pega uma instância de userService
        userService = TestBed.get(UserService);

        // faz junção do template e controller
        fixture = TestBed.createComponent(FooterComponent);
        // cria um instância do componente
        component = fixture.componentInstance;
        // detecta os ciclos de vida do projeto
        fixture.detectChanges();
    });

    // smokeTest
    it('must be instantiated', () => {
        expect(component).toBeTruthy();
    });

    describe('When an user exists', () => {
        it('it shows the footer', () => {
            const spy = spyOn(userService, 'getUser').and.returnValue(of({
                email: 'teste@gmail.com',
                name: 'Tester',
                id: 1
            }));
            const { getUser } = userService;

            component.ngOnInit();

            expect(getUser).toHaveBeenCalled();
            // expect(component).toExist
        });
    });

    // describe('When no user exists', () => {
    //     it('it does not show the footer', () => {
    //         const spy = spyOn(userService, 'getUser').and.returnValue(of(null));
    //         const { getUser } = userService;

    //         component.ngOnInit();
    //         // expect(fixture.debugElement.query(By.css('.header'))).toBeNull();

    //         expect(getUser).toHaveBeenCalled();
    //         expect(component).toHaveBeenCalled();
    //         // expect(component).not.toExist
    //     });
    // });
});
