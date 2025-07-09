import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatButton} from '@angular/material/button';
import {FormsModule, NgForm} from '@angular/forms';
import {TaskService} from '../shared/services/task.service';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
  ],
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<Dialog>);
  taskService = inject(TaskService);

  task = {
    title: '',
    description: '',
    completed: false
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.taskService.addTask(this.task);
      this.dialogRef.close();
      form.resetForm();
    }
  };

  close(): void {
    this.dialogRef.close();
  };
}
