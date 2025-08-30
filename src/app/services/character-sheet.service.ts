import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {
  private readonly STORAGE_KEY = 'iron_paw_character';

  constructor() { }

  saveCharacter(character: Character) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(character));
  }

  loadCharacter(): Character | null {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  }

  exportCharacter(character: Character) {
    const characterJson = JSON.stringify(character, null, 2);
    const blob = new Blob([characterJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.nome || 'personagem'}.json`;
    document.body.appendChild(a);
    a.click();

    // Limpar recursos
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  importCharacterFromFile(file: File): Promise<Character> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const character = JSON.parse(e.target.result) as Character;
          resolve(character);
        } catch (error) {
          reject(new Error('Arquivo JSON inválido'));
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
      reader.readAsText(file);
    });
  }

}
