import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Inventory, Item, Raridade, SlotEquipamento } from '../../models/inventory.model';
import { IconComponent } from "../../dumb-components/icon/icon.component";
import { NgClass } from "@angular/common";
import { ItemTooltipDirective } from '../../dumb-components/item-tooltip/item-tooltip.directive';
import { ButtonComponent } from "../../dumb-components/button/button.component";
import { Dialog } from '@angular/cdk/dialog';
import { ItemCreateComponent } from '../item-create/item-create.component';

@Component({
  selector: 'app-inventory',
  imports: [DragDropModule, IconComponent, NgClass, ItemTooltipDirective, ButtonComponent],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  inventory = model.required<Inventory>();

  dialog = inject(Dialog);

  constructor(private cdr: ChangeDetectorRef){
    try{
      if(this.inventory().itemSlots == undefined){
        this.inventory().itemSlots = [];
      }
      if(this.inventory().equipedItems == undefined){
        this.inventory().equipedItems = {};
      }
    }catch(e){
      let newInventory:Inventory = {
        itemSlots: [],
        dinheiro: 0,
        equipedItems: {}
      };
      this.inventory.set(newInventory);
    }


  }

  ngOnInit(): void {
    if (this.inventory().equipedItems == undefined) {
      this.inventory().equipedItems = {
        "Arma Corpo a Corpo": undefined,
        "Arma Pesada": undefined,
        "Escudo": undefined,
        "Arma a Distância": undefined,
        "Armadura": undefined,
        "Capacete": undefined,
        "Luvas": undefined,
        "Botas": undefined,
        "Acessório 1": undefined,
        "Acessório 2": undefined,
        "Acessório 3": undefined,
        "Outro": undefined,
      };
    }
  }

  openItemCreateDialog() {
    const dialogRef = this.dialog.open(ItemCreateComponent, {});

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.inventory().itemSlots.push({ item: result as Item, quantidade: 1 });
        this.cdr.detectChanges();
      }
    });
  }

  openItemEditDialog(item: Item) {
    const dialogRef = this.dialog.open(ItemCreateComponent, { data: item });
    dialogRef.closed.subscribe(result => {
      if (result) {
        const index = this.inventory().itemSlots.findIndex(i => i.item.id === item.id);
        if (index !== -1) {
          this.inventory().itemSlots[index].item = result as Item;
          this.cdr.detectChanges();
        }
      }
    });
  }

  deleteDroppedItem(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      const item = event.item.data;
      const index = this.inventory().itemSlots.findIndex(i => i.item.id === item.item.id);
      if (index !== -1) {
        if(confirm(`Deseja realmente deletar o item ${item.item.nome}?`)){
          this.inventory().itemSlots.splice(index, 1);
        }
      }
    }
  }

  dropItem(event: CdkDragDrop<any>, slot?: string) {

    if (event.previousContainer !== event.container) {
      if (event.previousContainer.id === 'itemsList' && slot) {
        const item = event.item.data;
        this.inventory().equipedItems![slot] = item.item;
      }

    } else {
      moveItemInArray(this.inventory().itemSlots, event.previousIndex, event.currentIndex);
    }
  }

  makeCanDropItemPredicate(slotName: string) {
    return (drag: any, drop: any) => {

      switch (slotName) {
        case 'Capacete':
          return drag.data.item.tipo === 'Capacete';
        case 'Armadura':
          return drag.data.item.tipo === 'Armadura';
        case 'Luvas':
          return drag.data.item.tipo === 'Luvas';
        case 'Botas':
          return drag.data.item.tipo === 'Botas';
        case 'Acessório':
          return drag.data.item.tipo === 'Acessório';
        case 'Escudo':
          return drag.data.item.tipo === 'Escudo';
        case 'Arma a Distância':
          return drag.data.item.tipo === 'Arma a Distância';
        case 'Arma Corpo a Corpo':
          return drag.data.item.tipo === 'Arma Pesada' || drag.data.item.tipo === 'Arma Corpo a Corpo';
        case 'Outro':
          return true;
      }

      return true;
    };
  }

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
