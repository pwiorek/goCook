import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveRecipeDialogComponent } from './remove-recipe-dialog/remove-recipe-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChooseRecipeComponent } from './choose-recipe/choose-recipe.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [RemoveRecipeDialogComponent, ChooseRecipeComponent],
  exports: [RemoveRecipeDialogComponent, ChooseRecipeComponent],
})
export class RecipesRecipesListUiModule {}
