import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Recipe } from "@go-cook/recipes/domain";
import {
    addRecipe,
    loadRecipes,
    loadRecipesFailure,
    loadRecipesSuccess,
    removeRecipe, removeRecipeFailure, removeRecipeSuccess,
    selectRecipe
} from "./recipes.actions";

export const RECIPES_FEATURE_KEY = 'recipes';

export interface RecipesState extends EntityState<Recipe> {
  recipes: Recipe[];
  selectedId?: string; // which Recipes record has been selected
  loaded: boolean; // has the Recipes list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecipesPartialState {
  readonly [RECIPES_FEATURE_KEY]: RecipesState;
}

export const recipesAdapter: EntityAdapter<Recipe> =
  createEntityAdapter<Recipe>();

export const initialRecipesState: RecipesState = recipesAdapter.getInitialState(
  {
    recipes: [],
    loaded: false,
  }
);

const reducer = createReducer(
  initialRecipesState,
  on(loadRecipes, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(addRecipe, (state, { recipe }) => ({
      ...state,
      recipes: [...state.recipes, recipe]
  })),

  on(removeRecipe, (state, { recipeId }) => ({
      ...state,
      recipes: state.recipes.filter(recipe => recipe._id !== recipeId)
  })),

  on(removeRecipeSuccess, (state) => ({
      ...state
  })),

  on(removeRecipeFailure, (state, { error }) => ({
      ...state,
      error,
  })),

  on(selectRecipe, (state, { recipeId }) => ({
      ...state,
      selectedId: recipeId
  })),

  on(loadRecipesSuccess, (state, { recipes }) => ({
      ...state,
      recipes,
      loaded: true
  })),

  on(loadRecipesFailure, (state, { error }) => ({
      ...state,
      error,
  })),
);

export function recipesReducer(
  state: RecipesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

