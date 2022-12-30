import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recipesShellRoutes } from './lib.routes';
import { RecipesComponent } from './containers/recipes.component';
import { SharedUiNavbarModule } from "@go-cook/shared/ui-navbar";
import { MatDialogModule } from "@angular/material/dialog";
import { RecipesRecipesListFeatureModule } from "@go-cook/recipes/recipes-list/feature";
import { RecipesDataAccessModule } from "@go-cook/recipes/data-access";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipesShellRoutes),
    SharedUiNavbarModule,
    MatDialogModule,
    RecipesRecipesListFeatureModule,
    RecipesDataAccessModule
  ],
  declarations: [RecipesComponent],
})
export class RecipesShellModule {}
