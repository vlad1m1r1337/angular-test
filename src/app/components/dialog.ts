import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-component',
  template: `<h1>{{ data.message }}</h1>`,
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<Dialog>);

  close(): void {
    this.dialogRef.close();
  }
}
