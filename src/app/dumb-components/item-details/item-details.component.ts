import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { Item, Raridade } from '../../models/inventory.model';

@Component({
  selector: 'ui-item-details',
  imports: [NgClass],
  template: `
  <div class="bg-zinc-900  rounded-md w-60 flex flex-col">
    <span class="text-sm px-2 py-1 rounded-t-md" [ngClass]="getRarityColor(item()!.raridade)">{{item()!.nome}}</span>
    <div class="p-2 bg-zinc-900 border border-zinc-700 rounded-b-md flex flex-col gap-2">
      <span class="text-xs text-zinc-400">Tipo: {{item()!.tipo}}</span>
      <span class="text-xs text-zinc-400">Descrição: {{item()!.descricao}}</span>
      @if (item()!.jogabilidade){
        <span class="text-xs text-zinc-400">Jogabilidade: {{item()!.jogabilidade}}</span>
      }

    </div>
  </div>`,
  styleUrl: './item-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  item = model<Item>();

  getRarityColor(rarity: Raridade): string {
      switch (rarity) {
        case 'Comum':
          return ' !bg-yellow-500/80 !border-yellow-400';
        case 'Incomum':
          return ' !bg-green-500/80 !border-green-400';
        case 'Raro':
          return ' !bg-blue-500/80 !border-blue-400';
        case 'Mítico':
          return ' !bg-violet-500/80 !border-violet-400';
        case 'Relíquia':
          return ' !bg-red-500/80 !border-red-400';
        default:
          return ' !bg-zinc-800 !border-zinc-400';
      }
    }
}
