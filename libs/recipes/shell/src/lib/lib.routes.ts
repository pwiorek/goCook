import { Route } from '@angular/router';
import { RecipesComponent } from "./containers/recipes.component";

export const recipesShellRoutes: Route[] = [
   {path: 'recipes', pathMatch: 'full', component: RecipesComponent}
];
