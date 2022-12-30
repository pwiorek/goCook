import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recipesRecipesDetailsFeatureRoutes } from './lib.routes';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedPipesModule } from "@go-cook/shared/pipes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipesRecipesDetailsFeatureRoutes),
    MatProgressSpinnerModule,
    SharedPipesModule
  ],
  declarations: [RecipeDetailsComponent],
})
export class RecipesRecipesDetailsFeatureModule {}
