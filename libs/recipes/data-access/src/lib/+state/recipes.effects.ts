import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
    loadRecipes,
    loadRecipesFailure,
    loadRecipesSuccess,
    removeRecipe, removeRecipeFailure,
    removeRecipeSuccess
} from "./recipes.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { RecipeDataService } from "../services/recipe-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class RecipesEffects {

  constructor(
      private actions$: Actions,
      private recipeDataService: RecipeDataService,
      private snackbar: MatSnackBar
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

    removeRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeRecipe),
            switchMap(({recipeId}) => this.recipeDataService.removeRecipe(recipeId).pipe(
                catchError(error => of(removeRecipeFailure({ error }))),
                map(() => removeRecipeSuccess()),
            ))
        )
    )

    removeRecipeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeRecipeSuccess),
            tap(() => this.snackbar.open(`Recipe has been successfully removed`, 'Great')),
        ),
        { dispatch: false }
    )

    removeRecipeFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeRecipeFailure),
            tap(() => this.snackbar.open('Something went wrong ;c', 'Okay')),
        ),
        { dispatch: false }
    )

}
