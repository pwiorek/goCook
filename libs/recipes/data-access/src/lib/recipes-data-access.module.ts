import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRecipes from './+state/recipes.reducer';
import { RecipesEffects } from './+state/recipes.effects';
import { RecipesFacade } from './+state/recipes.facade';
import { RecipeDataService } from "./services/recipe-data.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromRecipes.RECIPES_FEATURE_KEY, fromRecipes.recipesReducer),
    EffectsModule.forFeature([RecipesEffects]),
    HttpClientModule
  ],
  providers: [RecipesFacade, RecipeDataService],
})
export class RecipesDataAccessModule {}
