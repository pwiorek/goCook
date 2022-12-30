import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RECIPES_FEATURE_KEY,
  RecipesState,
  recipesAdapter,
} from './recipes.reducer';

// Lookup the 'Recipes' feature state managed by NgRx
export const selectRecipesState =
  createFeatureSelector<RecipesState>(RECIPES_FEATURE_KEY);

const { selectAll, selectEntities } = recipesAdapter.getSelectors();

export const selectRecipesLoaded = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.loaded
);

export const selectRecipesError = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.error
);

export const selectAllRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.recipes
);

export const selectRecipesEntities = createSelector(
  selectRecipesState,
  (state: RecipesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectRecipesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
