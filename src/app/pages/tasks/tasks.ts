import {Component, inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Task} from '../../models/task.model';
import {Dialog} from '../../components/dialog/dialog';
import {TaskService} from '../../services/task.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})

export class  Tasks {
  dialog = inject(MatDialog);
  tasks = inject(TaskService);

  tasks$ = this.tasks.getTasks$();

  openDialog(): void {
    this.dialog.open(Dialog);
  };

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      console.log('Все задачи:', tasks);
    });
  }
}
