import { async, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing/';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

describe('FooterComponent', () => {
    // criamos a variavél que irá receber o componente no escopo geral
    // para que ela seja acessada dentro dos testes
    let component: FooterComponent;

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
        const userService = TestBed.get(UserService);
        // cria o duble para o método getUser do userService
        spyOn(userService, 'getUser').and.returnValue(of({
            email: 'teste@gmail.com',
            name: 'Tester',
            id: 1
        }));

        // faz junção do template e controller
        const fixture = TestBed.createComponent(FooterComponent);
        // cria um instância do componente
        component = fixture.componentInstance;
        // detecta os ciclos de vida do projeto
        fixture.detectChanges();
    });

    // smokeTest
    it('must be instantiated', () => {
        expect(component).toBeTruthy();
    });
});
