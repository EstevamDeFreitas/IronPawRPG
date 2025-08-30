import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StyleType } from '../../models/styles.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  template: `<button [ngClass]="buttonClasses" [disabled]="disabled()">{{label()}}</button>`,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  buttonType = input<StyleType>('primary');
  disabled = input<boolean>(false);
  size = input<string>('md');

  get buttonClasses(): string {
    const base = 'px-4 py-2 rounded-lg font-medium focus:outline-none transition flex w-full text-' + this.size();

    const types = {
      primary: 'bg-orange-600 text-white ',
      secondary: 'bg-zinc-800 text-white',
      white: 'bg-zinc-50 text-zinc-900',
      danger: 'bg-red-500 text-white'
    }

    return `${base} ${types[this.buttonType()]} ${this.disabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-85 active:brightness-70'}`;
  }

}
