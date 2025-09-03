import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, signal, effect, DoCheck, inject } from '@angular/core';
import { Atributo, Character, Milestone, PERICIA_ATRIBUTO_MAP, PERICIA_TTITLE_MAP, PericiaNome, Pericias, PERICIAS_LIST } from '../../models/character.model';
import { InputComponent } from "../../dumb-components/input/input.component";
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../dumb-components/button/button.component';
import { PaletteSelectorComponent } from "../../dumb-components/palette-selector/palette-selector.component";
import { TextAreaComponent } from "../../dumb-components/text-area/text-area.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from "../../dumb-components/icon-button/icon-button.component";
import { CharacterSheetService } from '../../services/character-sheet.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {CdkMenuModule} from '@angular/cdk/menu';
import { IconSelectorComponent } from "../../dumb-components/icon-selector/icon-selector.component";
import { IconComponent } from "../../dumb-components/icon/icon.component";
import { Dialog } from '@angular/cdk/dialog';
import { MilestoneEditComponent } from '../milestone-edit/milestone-edit.component';

@Component({
  selector: 'app-character-sheet',
  imports: [InputComponent, ButtonComponent, NgClass, PaletteSelectorComponent, TextAreaComponent, FormsModule, CommonModule, IconButtonComponent, DragDropModule, CdkMenuModule, IconSelectorComponent, IconComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css',
})
export class CharacterSheetComponent implements OnInit, DoCheck {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('jsonFileInput') jsonFileInput!: ElementRef<HTMLInputElement>;
  character: Character;
  private previousCharacterState: string = '';
  isLoadingJson: boolean = false;

  icone: string = 'fi-br-comet';

  currentTab: 'backstory' | 'attributes' | 'milestones' | 'habilities' | 'inventory' = 'backstory';

  dialog = inject(Dialog);

  constructor(private cdr: ChangeDetectorRef, private characterService: CharacterSheetService) {
    this.character = this.createDefaultCharacter();
  }

  openMilestoneEditDialog(marco: any) {
    const dialogRef = this.dialog.open(MilestoneEditComponent, {
      data: marco,
    });

    dialogRef.closed.subscribe(result => {
      Object.assign(marco, result);
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    const savedCharacter = this.characterService.loadCharacter();
    if (savedCharacter) {
      this.character = savedCharacter;
    }
  }

  ngDoCheck(): void {
    console.log("Personagem foi alterado");

    const currentCharacterState = JSON.stringify(this.character);
    if (this.previousCharacterState !== currentCharacterState) {
      this.previousCharacterState = currentCharacterState;
      this.saveCharacter();
    }
  }

  private createDefaultCharacter(): Character {
    const character: Character = {
      nome: '',
      apelido: '',
      idade: '',
      genero: '',
      alinhamento: '',
      altura: '',
      personalidade: '',
      historia: '',
      vinculos: '',
      observacoes: '',
      vocacao: '',
      especie: '',
      vidaAtual: '',
      vidaMaxima: '',
      drive: '',
      imagemPersonagem: '',
      corPersonagem: 'blue',
      pericias: {},
      periciasEspecificas: {
        "Conhecimento Geral": '',
        "Conhecimento Específico": '',
        "Medicina/Ofícios": '',
        "Linguagens": '',
      },
      marcos: [],
      habilidades: [],
      inventario: []
    };

    const pericias: Pericias = {};
    PERICIAS_LIST.forEach(pericia => {
      pericias[pericia] = {
        1: false,
        2: false,
        3: false
      };
    });
    character.pericias = pericias;

    return character;
  }

  onPreviewClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.character.imagemPersonagem = e.target.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  getBackgroundColor(color:string|undefined, backgroundColor:string = 'zinc-900'): string {
    const cor = color || 'zinc';

    if (cor === 'zinc') {
      return `bg-gradient-to-bl from-${backgroundColor} via-${backgroundColor} to-${backgroundColor}`;
    }

    return `bg-gradient-to-bl from-${backgroundColor} via-${backgroundColor} to-${cor}-600/30`;
  }

  getMilestoneBackgroundColor(color:string|undefined, backgroundColor:string = 'zinc-900'): string {
    const cor = color || 'zinc';

    if (cor === 'zinc') {
      return `!bg-gradient-to-b from-${backgroundColor} via-${backgroundColor} to-${backgroundColor}`;
    }

    return `!bg-gradient-to-bl from-${backgroundColor} via-${backgroundColor} to-${cor}-500/40`;
  }

  getPericiasByAtributo(atributo: Atributo): PericiaNome[] {
    return PERICIAS_LIST.filter(pericia => PERICIA_ATRIBUTO_MAP[pericia] === atributo);
  }

  getPericiaTitulo(pericia: PericiaNome): string {
    return PERICIA_TTITLE_MAP[pericia] || '';
  }

  togglePericiaLevel(pericia: PericiaNome, level: 1 | 2 | 3, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (!this.character.pericias[pericia]) {
      this.character.pericias[pericia] = { 1: false, 2: false, 3: false };
    }

    if (isChecked) {
      for (let i = 1; i <= level; i++) {
        this.character.pericias[pericia][i as 1|2|3] = true;
      }
    } else {
      for (let i = level; i <= 3; i++) {
        this.character.pericias[pericia][i as 1|2|3] = false;
      }
    }

    this.cdr.detectChanges();
  }

  exportCharacter() {
    this.characterService.exportCharacter(this.character);
  }

  importCharacter() {
    this.jsonFileInput.nativeElement.click();
  }

  onJsonFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.isLoadingJson = true;

    this.characterService.importCharacterFromFile(file)
      .then(importedCharacter => {
        this.character = importedCharacter;
        this.saveCharacter();
        this.cdr.detectChanges();
      })
      .catch(error => {
        console.error('Erro ao importar personagem:', error);
        alert('Arquivo inválido ou corrompido. Verifique se é um JSON válido de personagem.');
      })
      .finally(() => {
        this.isLoadingJson = false;
        input.value = '';
        this.cdr.detectChanges();
      });
  }

  saveCharacter() {
    this.characterService.saveCharacter(this.character);
  }

  clearCharacter() {
    if (confirm("Tem certeza que deseja limpar o personagem atual? Esta ação não pode ser desfeita.")) {
      this.characterService.clearCurrentCharacter();
      this.character = this.createDefaultCharacter();
      this.cdr.detectChanges();
    }
  }

  addMarco() {
    this.character.marcos.push({
      titulo: '',
      descricao: '',
      jogabilidade: ''
    });
  }

  removeMarco(marco: any) {
     if (!confirm("Tem certeza que deseja remover este marco? Esta ação não pode ser desfeita.")){return;}

    const index = this.character.marcos.indexOf(marco);
    if (index > -1) {
      this.character.marcos.splice(index, 1);
      this.cdr.detectChanges();
    }
  }

  moveMarco(marco: any, direction: number) {
    const index = this.character.marcos.indexOf(marco);
    if (index > -1) {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < this.character.marcos.length) {
        this.character.marcos.splice(index, 1);
        this.character.marcos.splice(newIndex, 0, marco);
        this.cdr.detectChanges();
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.character.marcos, event.previousIndex, event.currentIndex);
  }

  getCardBackgroundColor(color:string|undefined): string {
    const cor = color || 'zinc';

    return `bg-${cor}-500/40`;
  }

  getIconOrDefault(iconName: string | undefined): string {
    return iconName || 'fi-br-star';
  }
}
