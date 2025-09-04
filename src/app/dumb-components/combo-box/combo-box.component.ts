import { ChangeDetectionStrategy, Component, input, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  imports: [FormsModule, NgClass],
  selector: 'app-combo-box',
  template: `
    <div class="flex flex-col">
      <label class="block text-xs font-medium">{{ label() }}</label>
      <select
        [(ngModel)]="comboValue"
        [ngClass]="'text-' + size()"
        class="w-full border-0 border-b-2 border-zinc-300 focus:bg-zinc-800 focus:rounded-0 focus:outline-none focus:shadow focus:shadow-orange-500/20 focus:ring-0 rounded-none p-1.5 mb-2"
      >
        <option value="" disabled selected hidden>{{ placeholder() }}</option>
        @for (item of items(); track item){
          @if (isObject(item)){
            <option [ngValue]="item[compareProp()]" >{{item[displayProp()]}}</option>
          }
          @else {
            <option [ngValue]="item">{{ item }}</option>
          }
        }
      </select>
    </div>
  `,
  styleUrl: './combo-box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboBoxComponent implements OnInit {
  label = input.required<string>();
  items = input.required<any[]>();
  compareProp = input<string>('');
  displayProp = input<string>('');
  comboValue = model<any>('');
  placeholder = input<string>('Selecione...');
  size = input<string>('md');

  ngOnInit() {
    // Inicializa o valor se estiver vazio
    if (this.comboValue() === '' && this.items()?.length > 0) {
      setTimeout(() => {
        this.comboValue.set(this.items()[0]);
      });
    }
  }

  isObject(item: any): boolean {
    return typeof item === 'object' && item !== null;
  }
}
