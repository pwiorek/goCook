import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'go-cook-credentials-dialog',
  templateUrl: './credentials-dialog.component.html',
  styleUrls: ['./credentials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsDialogComponent {}
