import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CORES, Cores } from '../../models/character.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-palette-selector',
  imports: [NgClass],
  template: `
    <div class="selector-container">
      <div
        class="selected-circle"
        [ngClass]="'bg-' + selectedColor() + '-500'"
        (click)="togglePalette()">
      </div>
      @if (showPalette) {
        <div class="palette-float">
          @for (color of cores; track color) {
            <div
              class="color-circle"
              [ngClass]="'bg-' + color + '-500'"
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
