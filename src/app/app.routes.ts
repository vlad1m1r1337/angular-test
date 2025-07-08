import { Routes } from '@angular/router';
import {App} from './app';
import {TasksInfo} from './pages/tasks-info/tasks-info';

export const routes: Routes = [
  { path: 'tasks', component: App },
  { path: 'tasksid', component: TasksInfo },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
