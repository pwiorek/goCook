import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recipesShellRoutes } from './lib.routes';
import { RecipesComponent } from './containers/recipes.component';
import { SharedUiNavbarModule } from "@go-cook/shared/ui-navbar";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipesShellRoutes),
    SharedUiNavbarModule,
    MatDialogModule
  ],
  declarations: [RecipesComponent],
})
export class RecipesShellModule {}
