import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  imports: [CommonModule, FormsModule],
  template: `<div class="flex flex-col">
    <label class="block text-xs font-medium mb-1">{{ label() }}</label>
    <textarea [placeholder]="placeholder()" [ngClass]="height()" class="w-full border-0 border-1 border-zinc-600 focus:border-orange-500 focus:ring-0 rounded-md p-2 text-sm bg-zinc-800" [(ngModel)]="value"></textarea>
  </div>`,
  styleUrl: './text-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  label = input.required<string>();
  placeholder = input<string>('');
  value = model<string>('');
  height = model<string>('h-18');

}
