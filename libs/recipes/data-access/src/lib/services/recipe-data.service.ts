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
}