import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {MatCard, MatCardActions, MatCardTitle} from '@angular/material/card';
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

  taskId!: string | null;
  task$ = this.tasks.getTask$(''); // инициализация, чтобы не было ошибки

  changeTaskStatus(newStatus: boolean) {
    if (!this.taskId) return;

    this.tasks.changeTaskStatus(this.taskId);
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.task$ = this.tasks.getTask$(this.taskId);
  }
}

