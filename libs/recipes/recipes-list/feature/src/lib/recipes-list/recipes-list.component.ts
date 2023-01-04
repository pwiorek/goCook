import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject, takeUntil } from "rxjs";
import { RecipesFacade, selectRecipe } from "@go-cook/recipes/data-access";
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
  public selectedRecipe$ = this.recipeFacade.selectedRecipe$;

  @ViewChild('searched') searchedRecipeInput!: ElementRef<HTMLInputElement>;

  constructor(
      private cd: ChangeDetectorRef,
      private dialog: MatDialog,
      private store: Store,
      private router: Router,
      private route: ActivatedRoute,
      private recipeFacade: RecipesFacade
  ) {
    this.setCurrentRecipeId();
  }

  ngAfterViewInit(): void {
    this.getRecipes();
  }

  public goToDetails(recipeId: string): void {
    this.store.dispatch(selectRecipe({recipeId}));
    this.router.navigate([recipeId], {relativeTo: this.route})
  }

  public identifyByRecipeId(index: number, item: Recipe): string {
    return item._id;
  }

  public editRecipe(event: Event, recipeId: string): void {
    event.stopPropagation();
    this.router.navigate([`edit`, recipeId], {relativeTo: this.route});
  }

  public removeRecipe(event: Event, recipe: Recipe): void {
    event.stopPropagation();

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

  private setCurrentRecipeId(): void {
    this.route.firstChild?.params.pipe(
        takeUntil(this.unsub$),
        map(params => params['recipeId']),
    ).subscribe(recipeId => this.store.dispatch(selectRecipe({recipeId})));
  }


  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
