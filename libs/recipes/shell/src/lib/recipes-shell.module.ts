import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './containers/recipes.component';
import { SharedUiNavbarModule } from "@go-cook/shared/ui-navbar";
import { MatDialogModule } from "@angular/material/dialog";
import { RecipesRecipesListFeatureModule } from "@go-cook/recipes/recipes-list/feature";
import { RecipesDataAccessModule } from "@go-cook/recipes/data-access";
import { RecipesShellRoutingModule } from "./recipes-shell-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RecipesShellRoutingModule,
    SharedUiNavbarModule,
    MatDialogModule,
    RecipesRecipesListFeatureModule,
    RecipesDataAccessModule
  ],
  declarations: [RecipesComponent],
})
export class RecipesShellModule {}
