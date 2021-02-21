import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

describe('Authservice', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  // Smoke Test
  it('must be instantiated', () => {
    expect(service).toBeTruthy();
  });

  // Authentica method
  it('must authenticate user', fakeAsync(() => {
    const fakeBody = {
      id: 1,
      nome: 'alvaro',
      email: 'alvarao@alura.com'
    };

    // criando spy para ser o duble do serviço setToken
    const spy = spyOn(userService, 'setToken').and.returnValue(null);

    service.authenticate('alvaro', '1234').subscribe(response => {
      expect(response.body).toEqual(fakeBody);
      expect(spy).toHaveBeenCalledWith('tokenTest');
    });

    // retorna um objeto válido definido no flush caso o metódo de requisição seja POST
    const request = httpMock.expectOne(req =>
      req.method === 'POST');

    // simula uma requisição no back-end, e retorna um body, e informações http
    // adicionais
    request.flush(fakeBody, {
      headers: { 'x-access-token': 'tokenTest' }
    });
    // simula a passagem do tempo junto com o fakeAsync()
    tick();
  }));
});
