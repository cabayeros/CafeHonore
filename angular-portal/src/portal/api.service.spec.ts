import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('Integración preparada para API', () => {
  let api: ApiService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
    api = TestBed.inject(ApiService);
  });
  afterEach(() => http.verify());

  it('sin configuración no intenta autenticar ni simula una cuenta', async () => {
    http.expectOne('config.json').flush({ apiBaseUrl: null });
    await expect(api.login('usuario', 'secreto')).rejects.toThrow('todavía no está disponible');
    expect(api.ready()).toBe(false);
    http.expectNone(request => request.url.includes('auth/login'));
  });
  it('un error al cargar configuración permite mantener el modo sin API', async () => {
    http.expectOne('config.json').flush('No disponible', { status: 404, statusText: 'Not Found' });
    await expect(api.content('politicas')).rejects.toThrow('todavía no está disponible');
    expect(api.ready()).toBe(false);
  });
  it('envía credenciales solo al endpoint configurado y habilita cookies de sesión', async () => {
    http.expectOne('config.json').flush({ apiBaseUrl: 'https://api.example.test/v1/' });
    const result = api.login('usuario', 'secreto');
    await new Promise(resolve => setTimeout(resolve, 0));
    const request = http.expectOne('https://api.example.test/v1/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.withCredentials).toBe(true);
    expect(request.request.body).toEqual({ username: 'usuario', password: 'secreto' });
    request.flush({ name: 'Usuario', points: 20 });
    await expect(result).resolves.toEqual({ name: 'Usuario', points: 20 });
  });
  it('propaga los errores de envío para no anunciar un éxito falso', async () => {
    http.expectOne('config.json').flush({ apiBaseUrl: 'https://api.example.test/v1' });
    const payload = { firstName: 'Ana', lastName: 'Pérez', phone: '22224444', email: 'ana@example.test', cardNumber: '123456', message: 'Consulta' };
    const result = api.contact(payload);
    const assertion = expect(result).rejects.toMatchObject({ status: 503 });
    await new Promise(resolve => setTimeout(resolve, 0));
    const request = http.expectOne('https://api.example.test/v1/contact');
    expect(request.request.body).toEqual(payload);
    request.flush('No disponible', { status: 503, statusText: 'Unavailable' });
    await assertion;
  });
});
