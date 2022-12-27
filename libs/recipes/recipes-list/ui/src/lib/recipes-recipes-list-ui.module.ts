import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveRecipeDialogComponent } from './remove-recipe-dialog/remove-recipe-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [RemoveRecipeDialogComponent],
  exports: [RemoveRecipeDialogComponent]
})
export class RecipesRecipesListUiModule {}
