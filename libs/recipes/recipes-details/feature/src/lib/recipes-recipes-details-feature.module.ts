import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedPipesModule } from "@go-cook/shared/pipes";
import { RecipesRecipesDetailsFeatureRoutingModule } from "./recipes-recipes-details-feature-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RecipesRecipesDetailsFeatureRoutingModule,
    MatProgressSpinnerModule,
    SharedPipesModule
  ],
  declarations: [RecipeDetailsComponent],
})
export class RecipesRecipesDetailsFeatureModule {}
