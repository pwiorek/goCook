import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'go-cook-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {}
