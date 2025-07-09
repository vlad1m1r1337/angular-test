import { Routes } from '@angular/router';
import {TasksInfo} from './pages/tasks-info/tasks-info';
import {Tasks} from './pages/tasks/tasks';

export const routes: Routes = [
  { path: 'tasks', component: Tasks },
  { path: 'tasks/:id', component: TasksInfo },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
