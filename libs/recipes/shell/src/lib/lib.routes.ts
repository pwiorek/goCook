import { Route } from '@angular/router';
import { RecipesComponent } from "./containers/recipes.component";

export const recipesShellRoutes: Route[] = [
   { path: '', redirectTo: 'recipes', pathMatch: 'full'},
   { path: 'recipes', pathMatch: 'full', component: RecipesComponent },
   { path: 'recipes/:recipeId', component: RecipesComponent,
      children: [
         { path: '', loadChildren: () => import('@go-cook/recipes/recipes-details/feature').then(m => m.RecipesRecipesDetailsFeatureModule)}
      ]
   }
];
