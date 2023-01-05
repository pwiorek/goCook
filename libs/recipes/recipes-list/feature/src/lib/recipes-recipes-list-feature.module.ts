import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RecipesRecipesListUiModule } from "@go-cook/recipes/recipes-list/ui";
import { RouterLink } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    RecipesRecipesListUiModule,
    RouterLink
  ],
  declarations: [RecipesListComponent],
  exports: [RecipesListComponent],
})
export class RecipesRecipesListFeatureModule {}
