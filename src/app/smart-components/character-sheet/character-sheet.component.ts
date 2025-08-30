import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Character } from '../../models/character.model';
import { InputComponent } from "../../dumb-components/input/input.component";
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../dumb-components/button/button.component';
import { PaletteSelectorComponent } from "../../dumb-components/palette-selector/palette-selector.component";

@Component({
  selector: 'app-character-sheet',
  imports: [InputComponent, ButtonComponent, NgClass, PaletteSelectorComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css',
})
export class CharacterSheetComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  character: Character;

  constructor() {
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
      this.compressImage(e.target.result, 128, 128, 1).then((compressed: string) => {
        this.character.imagemPersonagem = compressed;
      });
    };
    reader.readAsDataURL(file);
  }

  compressImage(dataUrl: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataUrl;
    });
  }

  getBackgroundColor(): string {
    const cor = this.character.corPersonagem || 'zinc'; // valor padrão

    if(cor == 'zinc'){
      return `bg-gradient-to-bl from-zinc-900 via-zinc-900 to-zinc-900`;
    }

    return `bg-gradient-to-bl from-zinc-900 via-zinc-900 to-${cor}-600/30`;
  }

}
