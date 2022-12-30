import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipesFacade } from "@go-cook/recipes/data-access";

@Component({
  selector: 'go-cook-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  public recipe = this.recipeFacade.selectedRecipe$;

  constructor(
      private recipeFacade: RecipesFacade
  ) {  }
}
