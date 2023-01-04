import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from "./containers/recipes.component";

const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent,
        children: [
            { path: 'edit/:recipeId', loadChildren: () => import('@go-cook/recipes/recipe-create-edit').then(m => m.RecipesRecipeCreateEditModule) },
            { path: 'create', loadChildren: () => import('@go-cook/recipes/recipe-create-edit').then(m => m.RecipesRecipeCreateEditModule) },
            { path: ':recipeId', loadChildren: () => import('@go-cook/recipes/recipes-details/feature').then(m => m.RecipesRecipesDetailsFeatureModule) }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesShellRoutingModule { }