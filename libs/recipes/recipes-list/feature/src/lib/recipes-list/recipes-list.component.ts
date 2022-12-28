import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Recipe } from "@go-cook/recipes/domain";
import { RemoveRecipeDialogComponent } from "@go-cook/recipes/recipes-list/ui";

const mockRecipes: Recipe[] = [
  {
    _id: 'a1',
    preparationTimeInMinutes: 15,
    name: 'Salad',
    description: 'Fast salad',
    ingredients: [{_id: 'i1', name: 'Lettuce', quantity: '3'}, {_id: 'i2', name: 'Cucumber', quantity: '3'}]
  },
  {
    _id: 'a2',
    preparationTimeInMinutes: 15,
    name: 'Tzatziki',
    description: 'Delicious greece sauce',
    ingredients: [{_id: 'i3', name: 'Yoghurt', quantity: '1'}, {_id: 'i2', name: 'Cucumber', quantity: '2'}]
  }
]
@Component({
  selector: 'go-cook-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements AfterViewInit, OnDestroy {
  private unsub$: Subject<void> = new Subject();
  public recipes = mockRecipes;

  @ViewChild('searched') searchedRecipeInput!: ElementRef<HTMLInputElement>;

  constructor(
      private cd: ChangeDetectorRef,
      private dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.getRecipesOnSearchedTermChange();
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

  private getRecipesOnSearchedTermChange(): void {
    fromEvent(this.searchedRecipeInput.nativeElement, 'input').pipe(
        takeUntil(this.unsub$),
        map(() => this.searchedRecipeInput.nativeElement.value),
        debounceTime(500),
        distinctUntilChanged(),
    ).subscribe(searched => {
      this.recipes = mockRecipes.filter(recipe => recipe.name.toLowerCase().includes(searched.toLowerCase()));
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
