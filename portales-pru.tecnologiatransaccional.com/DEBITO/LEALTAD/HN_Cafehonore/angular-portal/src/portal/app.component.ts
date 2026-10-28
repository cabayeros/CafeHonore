import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly year = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly dark = signal(this.initialTheme());
  readonly links = [
    ['inicio', 'Inicio'], ['acerca', 'Acerca de'], ['politicas', 'Politicas'],
    ['condiciones', 'Condiciones'], ['establecimientos', 'Establecimientos'],
    ['cuenta', 'Mi Cuenta'], ['contacto', 'Contáctenos']
  ];
  constructor() { this.applyTheme(); }
  private initialTheme(): boolean {
    try { const saved = localStorage.getItem('plus-theme'); if (saved) return saved === 'dark'; } catch { /* Sin almacenamiento. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  toggleTheme(): void {
    this.dark.update(value => !value);
    this.applyTheme();
    try { localStorage.setItem('plus-theme', this.dark() ? 'dark' : 'light'); } catch { /* Tema válido durante esta visita. */ }
  }
  private applyTheme(): void { document.documentElement.dataset['theme'] = this.dark() ? 'dark' : 'light'; }
}
