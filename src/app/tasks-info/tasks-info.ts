import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TaskService} from '../shared/services/task.service';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  standalone: true,
  selector: 'app-tasks-info',
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    CommonModule,
    MatCardTitle,
    AsyncPipe,
    MatSlideToggleModule
  ],
  templateUrl: './tasks-info.html',
  styleUrl: './tasks-info.scss'
})
export class TasksInfo {
  private route = inject(ActivatedRoute);
  private tasks = inject(TaskService);

  taskId = this.route.snapshot.paramMap.get('id');
  task$ = this.tasks.getTask$(this.taskId);

  changeTaskStatus() {
    if (!this.taskId) return;

    this.tasks.changeTaskStatus(this.taskId);
  }
}

