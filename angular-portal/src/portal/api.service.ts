import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface PortalContent { title: string; paragraphs: string[]; }
export interface Account { name: string; points: number; }
export interface ContactRequest { firstName: string; lastName: string; phone: string; email: string; cardNumber: string; message: string; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  readonly ready = signal(false);
  private baseUrl: string | null = null;
  private readonly initialization = this.loadConfig();

  private async loadConfig(): Promise<void> {
    try {
      const config = await firstValueFrom(this.http.get<{ apiBaseUrl: unknown }>('config.json'));
      if (typeof config.apiBaseUrl === 'string' && config.apiBaseUrl.trim()) {
        const url = new URL(config.apiBaseUrl, document.baseURI);
        if (!['https:', 'http:'].includes(url.protocol)) return;
        if (location.protocol === 'https:' && url.protocol !== 'https:') return;
        this.baseUrl = url.href.replace(/\/$/, '');
        this.ready.set(true);
      }
    } catch { /* La interfaz pública también funciona sin API. */ }
  }

  private async endpoint(path: string): Promise<string> {
    await this.initialization;
    if (!this.baseUrl) throw new Error('Este servicio todavía no está disponible.');
    return `${this.baseUrl}/${path}`;
  }
  async content(page: string): Promise<PortalContent> {
    return firstValueFrom(this.http.get<PortalContent>(await this.endpoint(`content/${page}`)));
  }
  async login(username: string, password: string): Promise<Account> {
    return firstValueFrom(this.http.post<Account>(await this.endpoint('auth/login'), { username, password }, { withCredentials: true }));
  }
  async logout(): Promise<void> {
    await firstValueFrom(this.http.post(await this.endpoint('auth/logout'), {}, { withCredentials: true }));
  }
  async contact(request: ContactRequest): Promise<void> {
    await firstValueFrom(this.http.post(await this.endpoint('contact'), request));
  }
}
