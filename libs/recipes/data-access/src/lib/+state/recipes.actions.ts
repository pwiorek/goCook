import { createAction, props } from '@ngrx/store';
import { Recipe } from "@go-cook/recipes/domain";

export const loadRecipes = createAction('[Recipes] Fetch Recipes');
export const addRecipe = createAction('[Recipes] Add Recipe', props<{recipe: Recipe}>());
export const removeRecipe = createAction('[Recipes] Remove Recipe', props<{recipeId: string}>());

export const loadRecipesSuccess = createAction(
  '[Recipes/API] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipes/API] Load Recipes Failure',
  props<{ error: any }>()
);
