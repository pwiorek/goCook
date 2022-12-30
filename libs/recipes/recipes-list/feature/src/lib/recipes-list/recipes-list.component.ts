import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject, takeUntil } from "rxjs";
import { addRecipe, RecipesFacade, selectRecipe } from "@go-cook/recipes/data-access";
import { RemoveRecipeDialogComponent } from "@go-cook/recipes/recipes-list/ui";
import { Recipe } from "@go-cook/recipes/domain";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'go-cook-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements AfterViewInit, OnDestroy {
  private unsub$: Subject<void> = new Subject();
  public recipes: Recipe[] = [];
  public currentRecipeId = this.route.snapshot.paramMap.get('recipeId');

  @ViewChild('searched') searchedRecipeInput!: ElementRef<HTMLInputElement>;

  constructor(
      private cd: ChangeDetectorRef,
      private dialog: MatDialog,
      private store: Store,
      private router: Router,
      private route: ActivatedRoute,
      private recipeFacade: RecipesFacade
  ) {
    if (this.currentRecipeId) this.store.dispatch(selectRecipe({recipeId: this.currentRecipeId}));
  }

  ngAfterViewInit(): void {
    this.getRecipes();
  }

  public goToDetails(recipeId: string): void {
    const currentId = this.route.snapshot.paramMap.get('recipeId');
    this.store.dispatch(selectRecipe({recipeId}));

    this.router.navigate([currentId ? `../${recipeId}` : recipeId], {relativeTo: this.route})
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
    const recipe: Recipe = { _id: Date.now().toString(), name: Date.now().toString(), description: 'abc', preparationTimeInMinutes: 125, ingredients: [] };

    this.store.dispatch(addRecipe({recipe}));
  }

  private getRecipes(): void {
    combineLatest(this.recipeFacade.allRecipes$, this.getSearchedRecipeName$()).pipe(
        takeUntil(this.unsub$),
        map(([recipes, searched]) => recipes.filter(recipe => recipe.name.toLowerCase().includes(searched.toLowerCase())))
    ).subscribe(recipes => {
      this.recipes = recipes;
      this.cd.detectChanges();
    });

    this.recipeFacade.init();
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

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
