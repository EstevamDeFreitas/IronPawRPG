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
  buttonType = input<string>('primary');
  size = input<string>('md');
  icon = input<string>('fa-solid fa-plus');
  title = input<string>('Adicionar');
  disabled = input<boolean>(false);

  get buttonClasses(): string {
    const base = 'px-3 py-2 rounded-md font-medium focus:outline-none transition text-' + this.size();

    let currentTypeStyle = "";

    switch (this.buttonType()) {
      case 'primary':
        currentTypeStyle = 'bg-orange-600' + (this.disabled() ? ' text-zinc-600' : ' text-white ');
        break;
      case 'secondary':
        currentTypeStyle = 'bg-zinc-800' + (this.disabled() ? ' text-zinc-600' : ' text-white ');
        break;
      case 'white':
        currentTypeStyle = 'bg-zinc-50' + (this.disabled() ? ' text-zinc-600' : ' text-zinc-800 ');
        break;
      case 'danger':
        currentTypeStyle = 'bg-red-500' + (this.disabled() ? ' text-zinc-600' : ' text-white ');
        break;
      case 'primaryActive':
        currentTypeStyle = (this.disabled() ? ' text-zinc-600 border border-zinc-600' : ' text-orange-600 border border-orange-600 bg-orange-600/20 ');
        break;
    }

    return `${base} ${currentTypeStyle} + (${this.disabled() ? ' cursor-not-allowed' : ' cursor-pointer hover:brightness-85 active:brightness-70'})`;
  }

}
