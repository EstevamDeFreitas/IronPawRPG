import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterSheetComponent } from "./smart-components/character-sheet/character-sheet.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharacterSheetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('IronPawRPG');
}
