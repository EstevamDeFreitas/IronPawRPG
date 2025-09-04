import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { InputComponent } from "../../dumb-components/input/input.component";
import { TextAreaComponent } from "../../dumb-components/text-area/text-area.component";
import { PaletteSelectorComponent } from "../../dumb-components/palette-selector/palette-selector.component";
import { IconSelectorComponent } from "../../dumb-components/icon-selector/icon-selector.component";
import { ComboBoxComponent } from "../../dumb-components/combo-box/combo-box.component";
import { RECURSOS_CONSUMIVEIS, TIPO_HABILIDADE } from '../../models/character.model';

@Component({
  selector: 'app-hability-edit',
  imports: [InputComponent, TextAreaComponent, PaletteSelectorComponent, IconSelectorComponent, ComboBoxComponent],
  template: `
    <div class="bg-zinc-900 p-4 w-128 rounded-md shadow-md border border-zinc-700 relative">
    <div>
      <h2 class="text-md mb-2 flex items-center gap-3"><i class="fa-solid fa-pencil"></i><span>Editar Habilidade</span></h2>
    </div>
    <div class="mb-4"></div>
    <div>
      <div class="grid grid-cols-3 gap-2">
        <app-input class="col-span-2" [label]="'Titulo'" [length]="36" [(value)]="data.titulo"></app-input>
        <app-combo-box size="sm" [label]="'Tipo de Habilidade'" [(comboValue)]="data.tipo" [items]="tipoHabilidade"></app-combo-box>
      </div>
      <br>
      <app-text-area [height]="'h-36'" [label]="'Descrição'" [(value)]="data.descricao"></app-text-area>
      <br>
      <app-text-area [height]="'h-48'" [label]="'Jogabilidade'" [(value)]="data.jogabilidade"></app-text-area>
      <br>
      <div class="grid grid-cols-2 gap-2">
        <app-combo-box size="sm" [label]="'Tipo de Custo'" [(comboValue)]="data.tipoGasto" [items]="['Mana', 'Vigor', 'Estresse']"></app-combo-box>
        <app-input [type]="'number'" [label]="'Gasto'" [(value)]="data.gasto"></app-input>
      </div>
      <div class="flex gap-2 absolute top-2 right-2">
        <app-palette-selector [(selectedColor)]="data.cor"></app-palette-selector>
        <app-icon-selector [(selectedIcon)]="data.icone"></app-icon-selector>
      </div>
    </div>
  </div>
  `,
  styleUrl: './hability-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabilityEditComponent implements OnDestroy {
  dialogref = inject<DialogRef<any>>(DialogRef<any>);
  data = inject(DIALOG_DATA);

  tipoHabilidade = TIPO_HABILIDADE;
  tipoGasto = RECURSOS_CONSUMIVEIS;

  ngOnDestroy(): void {
    if (this.dialogref) {
      this.dialogref.close(this.data);
    }
  }
}
