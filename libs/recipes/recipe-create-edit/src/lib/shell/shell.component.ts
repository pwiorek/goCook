import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "@go-cook/recipes/domain";
import { addRecipe, RecipesFacade, selectRecipe } from "@go-cook/recipes/data-access";
import { catchError, map, Subject, takeUntil } from "rxjs";
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RecipeDataService } from "@go-cook/recipes/data-access";
import { Store } from "@ngrx/store";

@Component({
  selector: 'go-cook-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnDestroy {
  private unsub$: Subject<void> = new Subject();
  private recipeId: string = this.route.snapshot.paramMap.get('recipeId') || '';

  public isEditMode = !!this.recipeId;
  public editedRecipe: Recipe | undefined;

  @ViewChild('recipeForm') recipeForm!: RecipeFormComponent;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private recipeFacade: RecipesFacade,
      private cd: ChangeDetectorRef,
      private snackbar: MatSnackBar,
      private recipeDataService: RecipeDataService,
      private store: Store
  ) {
    if (this.isEditMode) this.setEditedRecipe();
  }

  private setEditedRecipe(): void {
    this.recipeFacade.allRecipes$.pipe(
        takeUntil(this.unsub$),
        map(recipes => recipes.find(recipe => recipe._id === this.recipeId)),
    ).subscribe(recipe => {
      this.editedRecipe = recipe;
      this.cd.markForCheck();
    });
  }

  public submitForm(): void {
    this.recipeForm.form.markAllAsTouched();
    this.recipeForm.cd.markForCheck();

    if (!this.recipeForm.form.valid) {
      this.snackbar.open('Form is invalid', 'Okay')
      return;
    }

    const recipeForm = this.recipeForm.form.value;
    const recipeFunc = this.isEditMode ? this.recipeDataService.updateRecipe(this.recipeId, recipeForm)
                                       : this.recipeDataService.createRecipe(recipeForm);

    recipeFunc.pipe(
        takeUntil(this.unsub$),
        catchError(err => {
          this.snackbar.open('Something went wrong :c', 'Close');
          throw err;
        })
    ).subscribe(recipe => {
      this.snackbar.open('Everything went right! :)', 'Close');
      if (!this.isEditMode) this.store.dispatch(addRecipe({recipe}));
      this.store.dispatch(selectRecipe({recipeId: recipe?._id ?? this.recipeId}));

      this.router.navigateByUrl(`recipes/${recipe?._id ?? this.recipeId}`);
    })
  }

  public routeToMainPage(): void {
    this.store.dispatch(selectRecipe({recipeId: ''}));
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
