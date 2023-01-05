import { createAction, props } from '@ngrx/store';
import { Recipe } from "@go-cook/recipes/domain";

export const loadRecipes = createAction('[Recipes] Fetch Recipes');
export const addRecipe = createAction('[Recipes] Add Recipe', props<{recipe: Recipe}>());
export const removeRecipe = createAction('[Recipes] Remove Recipe', props<{recipeId: string}>());
export const selectRecipe = createAction('[Recipes] Select Recipe', props<{recipeId: string}>());

export const loadRecipesSuccess = createAction('[Recipes/API] Load Recipes Success', props<{ recipes: Recipe[] }>());
export const loadRecipesFailure = createAction('[Recipes/API] Load Recipes Failure', props<{ error: any }>());

export const removeRecipeSuccess = createAction('[Recipes/API] Remove Recipe Success');
export const removeRecipeFailure = createAction('[Recipes/API] Remove Recipes Failure', props<{ error: any }>());