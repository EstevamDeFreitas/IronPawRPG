import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Item, RARIDADE, TIPO_ITEM } from '../../models/inventory.model';
import { InputComponent } from "../../dumb-components/input/input.component";
import { ComboBoxComponent } from "../../dumb-components/combo-box/combo-box.component";
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from "../../dumb-components/text-area/text-area.component";
import { IconSelectorComponent } from "../../dumb-components/icon-selector/icon-selector.component";
import { ButtonComponent } from "../../dumb-components/button/button.component";

@Component({
  imports: [InputComponent, ComboBoxComponent, FormsModule, TextAreaComponent, IconSelectorComponent, ButtonComponent],
  template: `
    <div class="bg-zinc-900 p-4 w-128 rounded-md shadow-md border border-zinc-700 relative">
      <h2 class="text-md">Criar Item</h2>
      <div class="mb-4"></div>
      <div class="grid grid-cols-4 gap-2">
        <app-input label="Nome"  [(value)]="item.nome" class="col-span-3"></app-input>
        <app-combo-box [label]="'Tipo'" [items]="tipoItem"
            [(comboValue)]="item.tipo" [placeholder]="'Selecione um Tipo'"
            [size]="'xs'"></app-combo-box>
        <app-combo-box class="col-span-2" [label]="'Raridade'" [items]="raridades"
            [(comboValue)]="item.raridade" [placeholder]="'Selecione uma Raridade'"
            [size]="'xs'"></app-combo-box>
        <div class="col-span-2 flex flex-row items-center gap-2">
            <input class="w-4 h-4" type="checkbox" name="consumivel" id="consumivel" [(ngModel)]="item.consumivel">
            <label class="text-sm" for="consumivel">Consumível</label>
        </div>
        <app-text-area class="col-span-4" height="h-40" [label]="'Descrição'" [(value)]="item.descricao"></app-text-area>
        <app-text-area class="col-span-4" height="h-40" [label]="'Jogabilidade'" [(value)]="item.jogabilidade"></app-text-area>
      </div>
      <div class="mb-4"></div>
      <div class="flex">
        <app-button [label]="'Salvar'" size="sm" (click)="save()"></app-button>
      </div>
      <div class="absolute top-2 right-2">
        <app-icon-selector [(selectedIcon)]="item.icone"></app-icon-selector>
      </div>

    </div>
  `,
  styleUrl: './item-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCreateComponent {
  dialogref = inject<DialogRef<any>>(DialogRef<any>);
  data = inject(DIALOG_DATA);

  tipoItem = TIPO_ITEM;
  raridades = RARIDADE;

  item:Item = {} as Item;

  constructor() {
    if (this.data) {
      this.item = { ...this.data } as Item;
    } else {
      this.item = {
        id: '',
        nome: '',
        tipo: 'Outro',
        icone: '',
        raridade: 'Comum',
        consumivel: false,
        descricao: '',
        jogabilidade: '',
        efeitos: []
      };
    }
  }

  save(){
    console.log("Iniciado Save");

    this.item.id = this.item.nome.toLowerCase().replace(/\s+/g, '-') + '-' + this.item.tipo.toLowerCase().replace(/\s+/g, '-') + '-' + this.item.raridade.toLowerCase().replace(/\s+/g, '-');
    if (this.dialogref) {
      this.dialogref.close(this.item);
    }

  }
}
