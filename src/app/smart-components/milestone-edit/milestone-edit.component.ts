import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { InputComponent } from "../../dumb-components/input/input.component";
import { TextAreaComponent } from "../../dumb-components/text-area/text-area.component";
import { PaletteSelectorComponent } from "../../dumb-components/palette-selector/palette-selector.component";
import { IconSelectorComponent } from "../../dumb-components/icon-selector/icon-selector.component";

@Component({
  selector: 'app-milestone-edit',
  imports: [InputComponent, TextAreaComponent, PaletteSelectorComponent, IconSelectorComponent],
  template: `
  <div class="bg-zinc-900 p-4 w-128 rounded-md shadow-md border border-zinc-700">
    <div>
      <h2 class="text-md mb-2 flex items-center gap-3"><i class="fa-solid fa-pencil"></i><span>Editar Marco</span></h2>
    </div>
    <div class="mb-4"></div>
    <div>
      <app-input [label]="'Titulo'" [length]="36" [(value)]="data.titulo"></app-input>
      <br>
      <app-text-area [height]="'h-64'" [label]="'Descrição'" [(value)]="data.descricao"></app-text-area>
      <br>
      <app-text-area [height]="'h-12'" [label]="'Jogabilidade'" [(value)]="data.jogabilidade"></app-text-area>
      <div class="mb-4"></div>
      <div class="grid grid-cols-2">
        <app-palette-selector [(selectedColor)]="data.cor"></app-palette-selector>
        <app-icon-selector [(selectedIcon)]="data.icone"></app-icon-selector>
      </div>
    </div>
  </div>`,
  styleUrl: './milestone-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MilestoneEditComponent implements OnDestroy {
  dialogref = inject<DialogRef<any>>(DialogRef<any>);
  data = inject(DIALOG_DATA);

  ngOnDestroy(): void {
  if (this.dialogref) {
    this.dialogref.close(this.data);
  }
}
}
