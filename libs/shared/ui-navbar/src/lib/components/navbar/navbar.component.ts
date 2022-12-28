import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CredentialsDialogComponent } from "../credentials-dialog/credentials-dialog.component";

@Component({
  selector: 'go-cook-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  constructor(
      private dialog: MatDialog
  ) { }

  public openCredentialsDialog(): void {
    this.dialog.open(CredentialsDialogComponent,  {
      width: '300px',
      height: '150px'
    })
  }

}
