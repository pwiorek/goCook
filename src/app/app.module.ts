import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";

import { RecipesShellModule } from "@go-cook/recipes/shell";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterOutlet,
    RecipesShellModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
