import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StyleType } from '../../models/styles.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon-button',
  imports: [NgClass],
  template: `<button [ngClass]="buttonClasses" [title]="title()"><i [ngClass]="icon()"></i></button>`,
  styleUrl: './icon-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  buttonType = input<StyleType>('primary');
  size = input<string>('md');
  icon = input<string>('fa-solid fa-plus');
  title = input<string>('Adicionar');
  disabled = input<boolean>(false);

  get buttonClasses(): string {
    const base = 'px-3 py-2 rounded-md font-medium focus:outline-none transition text-' + this.size();

    const types = {
      primary: 'bg-orange-600' + (this.disabled() ? ' text-zinc-600' : ' text-white '),
      secondary: 'bg-zinc-800' + (this.disabled() ? ' text-zinc-600' : ' text-white '),
      white: 'bg-zinc-50' + (this.disabled() ? ' text-zinc-600' : ' text-zinc-800 '),
      danger: 'bg-red-500' + (this.disabled() ? ' text-zinc-600' : ' text-white ')
    }

    return `${base} ${types[this.buttonType()]} + (${this.disabled() ? ' cursor-not-allowed' : ' cursor-pointer hover:brightness-85 active:brightness-70'})`;
  }
}
