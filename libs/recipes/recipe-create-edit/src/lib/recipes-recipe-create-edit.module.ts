import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './shell/shell.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RecipesRecipeCreateEditRoutingModule } from "./recipes-recipe-create-edit-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RecipesRecipeCreateEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [RecipeFormComponent, ShellComponent],
})
export class RecipesRecipeCreateEditModule {}
