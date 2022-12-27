import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'go-cook-remove-recipe-dialog',
  templateUrl: './remove-recipe-dialog.component.html',
  styleUrls: ['./remove-recipe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveRecipeDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<RemoveRecipeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { recipeName: string },
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
