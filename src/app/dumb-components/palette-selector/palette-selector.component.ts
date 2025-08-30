import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CORES, Cores } from '../../models/character.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-palette-selector',
  imports: [NgClass],
  template: `
    <div class="relative flex justify-center h-full items-center">
      <div
        class="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 transition-colors duration-200 hover:border-gray-500"
        [ngClass]="'bg-' + selectedColor() + '-500'"
        (click)="togglePalette()">
      </div>
      @if (showPalette) {
        <div class="absolute top-10 left-0 flex gap-2 bg-zinc-800 p-3 border border-zinc-700 rounded-xl shadow-lg z-50">
          @for (color of cores; track color) {
            <div
              class="w-7 h-7 rounded-full cursor-pointer  transition-colors duration-200 hover:border-gray-800 hover:brightness-85"
              [ngClass]="['bg-' + color + '-500']"
              (click)="selectColor(color)">
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './palette-selector.component.css',
})
export class PaletteSelectorComponent {
  selectedColor = input<Cores>();
  selectedColorChange = output<Cores>();

  showPalette = false;
  cores = CORES;

  selectColor(color: Cores) {
    this.selectedColorChange.emit(color);
    this.showPalette = false;
  }

  togglePalette() {
    this.showPalette = !this.showPalette;
  }
}
