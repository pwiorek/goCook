import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'go-cook-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {

  constructor(
      private dialog: MatDialog
  ) { }

  public openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef,  {
      width: '300px',
      height: '150px'
    })
  }
}
