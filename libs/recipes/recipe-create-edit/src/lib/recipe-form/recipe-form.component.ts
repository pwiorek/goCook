import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Recipe } from "@go-cook/recipes/domain";

@Component({
  selector: 'go-cook-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnChanges {
  @Input() initialValue: Recipe | undefined;

  public form: FormGroup = this.createForm();

  constructor(
      private fb: FormBuilder,
      public cd: ChangeDetectorRef
  ) {
    this.addMandatoryIngredientFields();
    this.loadInitialRecipe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      this.loadInitialRecipe();
    }
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(80)]),
      preparationTimeInMinutes: new FormControl(null, [Validators.required, Validators.min(0)]),
      description: new FormControl(null, [Validators.required, Validators.min(15), Validators.max(255)]),
      ingredients: this.fb.array([])
    })
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.controls['ingredients'] as FormArray;
  }

  public addIngredient(): void {
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.max(80)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)])
    }));
  }

  public removeIngredient(id: number): void {
    const control = <FormArray>this.form.controls['ingredients'];

    if (control.length > 2)
      control.removeAt(id);
  }

  private addMandatoryIngredientFields(): void {
    for (let i = 0; i < 2; i++) {
      this.addIngredient();
    }
  }

  private loadInitialRecipe(): void {
    if (!this.initialValue) return;

    this.initialValue?.ingredients?.forEach((_, index) => {
      if (index >= 2) this.addIngredient();
    })

    this.form.patchValue(this.initialValue);
  }
}
