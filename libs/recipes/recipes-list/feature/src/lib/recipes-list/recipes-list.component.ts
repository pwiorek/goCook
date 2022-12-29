import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject, takeUntil } from "rxjs";
import { addRecipe, loadRecipes, selectAllRecipes } from "@go-cook/recipes/data-access";
import { RemoveRecipeDialogComponent } from "@go-cook/recipes/recipes-list/ui";
import { Recipe } from "@go-cook/recipes/domain";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";

@Component({
  selector: 'go-cook-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements AfterViewInit, OnDestroy {
  private unsub$: Subject<void> = new Subject();
  public recipes: Recipe[] = [];

  @ViewChild('searched') searchedRecipeInput!: ElementRef<HTMLInputElement>;

  constructor(
      private cd: ChangeDetectorRef,
      private dialog: MatDialog,
      private store: Store
  ) {  }

  ngAfterViewInit(): void {
    this.getRecipes();
  }

  public identifyByRecipeId(index: number, item: Recipe): string {
    return item._id;
  }

  public editRecipe(recipeId: string): void {
    // TODO: Add routing to edit section
    console.log('edit recipe', recipeId);
  }

  public removeRecipe(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RemoveRecipeDialogComponent, {
      data: { recipeName: recipe.name }
    })

    dialogRef.afterClosed().pipe(
        takeUntil(this.unsub$),
        filter(result => !!result)
    ).subscribe(() => {
      // TODO: Remove recipe
      console.log(`${recipe.name} has been removed`);
    });
  }

  public addRecipe(): void {
    // TODO: Add form with new recipes
    const recipe: Recipe = { _id: Date.now().toString(), name: Date.now().toString(), description: 'abc', preparationTimeInMinutes: 5, ingredients: [] };

    this.store.dispatch(addRecipe({recipe}));
  }

  private getRecipes(): void {
    this.getRecipesFromStore();
    this.store.dispatch(loadRecipes());
    this.searchedRecipeInput.nativeElement.dispatchEvent(new Event('input'));
  }

  private getSearchedRecipeName$(): Observable<string> {
    return fromEvent(this.searchedRecipeInput.nativeElement, 'input').pipe(
        takeUntil(this.unsub$),
        map(() => this.searchedRecipeInput.nativeElement.value),
        debounceTime(500),
        distinctUntilChanged(),
    )
  }

  private getRecipesFromStore(): void {
    combineLatest(this.store.select(selectAllRecipes), this.getSearchedRecipeName$()).subscribe(
        ([recipes, searched]) => {
          this.recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searched.toLowerCase()));
          this.cd.detectChanges();
        }
    )
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
