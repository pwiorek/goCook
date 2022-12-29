import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RecipesActions from './recipes.actions';
import * as RecipesFeature from './recipes.reducer';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from "./recipes.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { RecipeDataService } from "../services/recipe-data.service";

@Injectable()
export class RecipesEffects {

  constructor(
      private actions$: Actions,
      private recipeDataService: RecipeDataService
  ) {
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.loadRecipes),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RecipesActions.loadRecipesSuccess({ recipes: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RecipesActions.loadRecipesFailure({ error });
        },
      })
    )
  );

  loadRecipes$ = createEffect(() =>
      this.actions$.pipe(
          ofType(loadRecipes),
          switchMap(() => this.recipeDataService.fetchRecipes().pipe(
              map(recipes => loadRecipesSuccess({ recipes })),
              catchError(error => of(loadRecipesFailure({ error })))
          ))
      )
  )
}
