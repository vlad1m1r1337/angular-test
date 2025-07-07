import { Routes } from '@angular/router';
import {App} from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: App },
];
