import { Component, input, model, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  template: `<div class="flex flex-col">
    <label class="block text-xs font-medium">{{ label() }}</label>
    <input [type]="type()" [maxLength]="length() || 9999" [(ngModel)]="value" [placeholder]="placeholder()" class="w-full border-0 border-b-2 border-zinc-300 focus:border-orange-500 focus:ring-0 rounded-none p-1.5 text-sm mb-2 bg-transparent" />
  </div>`,
  styleUrl: './input.component.css'
})
export class InputComponent {
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<string>('text');
  value = model<any>('');
  required = input<boolean>(false);
  length = input<number>();

  touched = signal(false);


}
