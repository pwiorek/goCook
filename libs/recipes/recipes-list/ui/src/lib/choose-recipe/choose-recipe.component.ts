import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'go-cook-choose-recipe',
  templateUrl: './choose-recipe.component.html',
  styleUrls: ['./choose-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseRecipeComponent {}
