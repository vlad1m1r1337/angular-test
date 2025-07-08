import {Component, inject, model, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {TaskService} from './services/task.service';
import {Task} from './models/task.model';
import {Dialog} from './components/dialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
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
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private dialog = inject(MatDialog); // Inject MatDialog in a valid context
  tasks: Task[] = [];

  openDialog(): void {
    this.dialog.open(Dialog, {
      data: { message: 'Пример сообщения' },
    });
  }
  readonly name = '1231';

  constructor(public taskService: TaskService) {}

  async ngOnInit() {
    await this.taskService.initDB();
    this.taskService.getTasks$().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    const newTask: Task = {
      title: 'Пример задачи',
      description: 'Описание задачи',
      completed: false,
    };
    console.log('Adding task:', newTask);
    this.taskService.addTask(newTask);
  }
  delete() {
    if( this.tasks.length > 0) {
      const taskToDelete = this.tasks[0]; // Пример удаления первой задачи
      console.log('Deleting task:', taskToDelete);
      this.taskService.deleteTask(taskToDelete.id!);
    }
  }
  // toggle(task: Task) {
  //   this.taskService.updateTask({ ...task, completed: !task.completed });
  // }
  //
  // delete(task: Task) {
  //   if (task.id) this.taskService.deleteTask(task.id);
  // }
}

