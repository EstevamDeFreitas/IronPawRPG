import { ChangeDetectionStrategy, Component, input, output, HostListener } from '@angular/core';
import { ICONS_INLINE } from '../../models/icons-inline';
import { NgClass } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-icon-selector',
  imports: [NgClass, IconComponent],
  template: `
    <div class="relative flex justify-center h-full items-center" (click)="$event.stopPropagation()">
      <!-- Botão com ícone atual -->
      <button
        type="button"
        class="rounded-full border-2 border-gray-300 bg-zinc-800 cursor-pointer hover:border-gray-500 transition-colors w-8 h-8 flex items-center justify-center"
        (click)="togglePopover()"
      >
        <ui-icon [name]="selectedIcon()" svgClass="w-4 h-4 block icon fill-orange-500"></ui-icon>
      </button>

      <!-- Popover de seleção -->
       @if (showPopover){
        <div class="absolute z-50 top-12 left-0 bg-zinc-800 p-3 h-48 border border-zinc-700 rounded-xl shadow-lg flex flex-wrap gap-2 overflow-y-auto min-w-48" >
        @for (icon of icons; track icon) {
          <div
            class="p-1 rounded cursor-pointer"
            [ngClass]="icon === selectedIcon() ? 'bg-zinc-700' : 'border-transparent hover:bg-zinc-700'"
            (click)="selectIcon(icon)" >
            <ui-icon [name]="icon" [svgClass]="'!w-7 !h-7 block ' + (icon === selectedIcon() ? 'fill-orange-500' : 'fill-zinc-400')"></ui-icon>
          </div>
        }
      </div>
       }

    </div>
  `,
  styleUrl: './icon-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSelectorComponent {
  selectedIcon = input<string>('fi-br-bolt');
  selectedIconChange = output<string>();

  showPopover = false;
  icons = Object.keys(ICONS_INLINE);

  constructor(private sanitizer: DomSanitizer){}

  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  selectIcon(icon: string) {
    this.selectedIconChange.emit(icon);
    this.showPopover = false;
  }

  getIconSvg(icon: string) {
    return this.sanitizer.bypassSecurityTrustHtml(ICONS_INLINE[icon] || '');
  }

  // Fecha o popover ao clicar fora
  @HostListener('document:click')
  closePopover() {
    this.showPopover = false;
  }
}
