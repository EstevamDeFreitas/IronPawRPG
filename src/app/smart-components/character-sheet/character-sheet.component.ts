import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Atributo, Character, PERICIA_ATRIBUTO_MAP, PericiaNome, Pericias, PERICIAS_LIST } from '../../models/character.model';
import { InputComponent } from "../../dumb-components/input/input.component";
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../dumb-components/button/button.component';
import { PaletteSelectorComponent } from "../../dumb-components/palette-selector/palette-selector.component";
import { TextAreaComponent } from "../../dumb-components/text-area/text-area.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-sheet',
  imports: [InputComponent, ButtonComponent, NgClass, PaletteSelectorComponent, TextAreaComponent, FormsModule, CommonModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css',
})
export class CharacterSheetComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  character: Character;

  currentTab: 'backstory' | 'attributes' = 'backstory';

  constructor(private cdr: ChangeDetectorRef) {
    this.character = {
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
      corPersonagem: 'blue', // Nova propriedade para a cor do personagem
      pericias: {},
      periciasEspecificas: {
        "Conhecimento Geral": '',
        "Conhecimento Específico": '',
        "Ofícios": ''
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

    this.character.pericias = pericias;
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

  getBackgroundColor(): string {
    const cor = this.character.corPersonagem || 'zinc'; // valor padrão

    if (cor == 'zinc') {
      return `bg-gradient-to-bl from-zinc-900 via-zinc-900 to-zinc-900`;
    }

    return `bg-gradient-to-bl from-zinc-900 via-zinc-900 to-${cor}-600/30`;
  }

  getPericiasByAtributo(atributo: Atributo): PericiaNome[] {
    return PERICIAS_LIST.filter(pericia => PERICIA_ATRIBUTO_MAP[pericia] === atributo);
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

}
