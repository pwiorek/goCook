import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recipesShellRoutes } from './lib.routes';
import { RecipesComponent } from './containers/recipes.component';
import { SharedUiNavbarModule } from "@go-cook/shared/ui-navbar";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipesShellRoutes),
    SharedUiNavbarModule
  ],
  declarations: [RecipesComponent],
})
export class RecipesShellModule {}
