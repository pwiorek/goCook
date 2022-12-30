import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

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
