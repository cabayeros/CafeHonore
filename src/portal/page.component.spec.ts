import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ApiService } from './api.service';
import { PageComponent } from './page.component';

describe('Carrusel automático', () => {
  let reduceMotion = false;
  beforeEach(() => {
    vi.useFakeTimers();
    reduceMotion = false;
    vi.stubGlobal('matchMedia', () => ({ matches: reduceMotion, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    TestBed.configureTestingModule({
      imports: [PageComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { data: of({ page: 'inicio' }) } },
        { provide: ApiService, useValue: { ready: signal(false) } }
      ]
    });
  });
  afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  it('recorre las tres marcas y vuelve a la primera cada cinco segundos', () => {
    const fixture = TestBed.createComponent(PageComponent);
    expect(fixture.componentInstance.slide()).toBe(0);
    vi.advanceTimersByTime(5000);
    expect(fixture.componentInstance.slide()).toBe(1);
    vi.advanceTimersByTime(10000);
    expect(fixture.componentInstance.slide()).toBe(0);
  });

  it('se detiene al pausar, pasar el puntero o enfocar sus controles', () => {
    const fixture = TestBed.createComponent(PageComponent);
    const page = fixture.componentInstance;
    page.hovering.set(true); vi.advanceTimersByTime(5000);
    expect(page.slide()).toBe(0);
    page.hovering.set(false); page.focusWithin.set(true); vi.advanceTimersByTime(5000);
    expect(page.slide()).toBe(0);
    page.focusWithin.set(false); page.playing.set(false); vi.advanceTimersByTime(5000);
    expect(page.slide()).toBe(0);
    page.playing.set(true); vi.advanceTimersByTime(5000);
    expect(page.slide()).toBe(1);
  });

  it('no reproduce automáticamente con movimiento reducido y limpia su temporizador al salir', () => {
    reduceMotion = true;
    const fixture = TestBed.createComponent(PageComponent);
    expect(fixture.componentInstance.playing()).toBe(false);
    vi.advanceTimersByTime(10000);
    expect(fixture.componentInstance.slide()).toBe(0);
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
