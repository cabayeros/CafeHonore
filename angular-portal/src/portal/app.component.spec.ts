import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('Navegación y apariencia del portal', () => {
  beforeEach(() => {
    localStorage.setItem('plus-theme', 'light');
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter([])] });
  });
  afterEach(() => { localStorage.removeItem('plus-theme'); delete document.documentElement.dataset['theme']; });

  it('conserva las siete opciones originales', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const links = Array.from(fixture.nativeElement.querySelectorAll('.nav-links a')) as HTMLAnchorElement[];
    expect(links.map(link => link.textContent?.trim())).toEqual(['Inicio', 'Acerca de', 'Politicas', 'Condiciones', 'Establecimientos', 'Mi Cuenta', 'Contáctenos']);
  });

  it('alterna el tema y recupera la preferencia al abrir otra vez el portal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('plus-theme')).toBe('dark');
    expect(fixture.nativeElement.querySelector('.theme-toggle').getAttribute('aria-pressed')).toBe('true');
    fixture.destroy();
    const reopened = TestBed.createComponent(AppComponent);
    expect(reopened.componentInstance.dark()).toBe(true);
  });

  it('abre y cierra el menú móvil con un estado accesible', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    toggle.click(); fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('#main-menu').classList.contains('open')).toBe(true);
    toggle.click(); fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});
