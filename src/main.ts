import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './portal/app.component';
import { PageComponent } from './portal/page.component';
const pages = ['inicio', 'acerca', 'politicas', 'condiciones', 'establecimientos', 'cuenta', 'contacto'];
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter([
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    ...pages.map(path => ({ path, component: PageComponent, data: { page: path } })),
    { path: '**', redirectTo: 'inicio' }
  ], withHashLocation())]
}).catch(error => console.error('No se pudo iniciar el portal.', error));
