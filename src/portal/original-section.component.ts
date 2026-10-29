import { Component, input, signal } from '@angular/core';
import { ORIGINAL_CONTENT } from './original-content';

@Component({
  selector: 'app-original-section',
  template: `
    @if (page() === 'politicas') {
      <div class="policy-tabs" role="group" aria-label="Tipo de tarjeta">
        @for (tab of tabs; track tab.key) {
          <button type="button" [class.active]="selected() === tab.key" [attr.aria-pressed]="selected() === tab.key" (click)="selected.set(tab.key)">{{ tab.label }}</button>
        }
      </div>
    }
    <section class="original-content" [class.about-content]="page() === 'acerca'" [class.policy-content]="page() === 'politicas'" [class.conditions-content]="page() === 'condiciones'" [class.establishments-content]="page() === 'establecimientos'" [innerHTML]="html"></section>
  `
})
export class OriginalSectionComponent {
  readonly page = input.required<string>();
  readonly selected = signal('gift');
  readonly tabs = [{ key: 'gift', label: 'Gift card' }, { key: 'plus', label: 'Plus card' }, { key: 'corporativa', label: 'Corporativa' }];
  get html(): string { return ORIGINAL_CONTENT[this.page() === 'politicas' ? `politicas-${this.selected()}` : this.page()] ?? ''; }
}
