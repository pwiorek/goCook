import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "@go-cook/recipes/domain";
import { apiUrl } from "../utils/urls";

@Injectable()
export class RecipeDataService {

    constructor(
        private http: HttpClient
    ) { }

    public fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${apiUrl}/recipes`);
    }

    public createRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${apiUrl}/recipes`, recipe);
    }

    public updateRecipe(recipeId: string, recipe: Recipe): Observable<any> {
        return this.http.put(`${apiUrl}/recipes/${recipeId}`, recipe);
    }
}