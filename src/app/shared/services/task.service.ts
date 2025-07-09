import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Task} from './task.model';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: Task) {
    const current = this.tasksSubject.value;
    this.tasksSubject.next([...current, { ...task, id: this.generateId() }]);
  }

  deleteTask(id: string | undefined) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  changeTaskStatus(id: string | undefined) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  private generateId(): string {
    return uuidv4();
  }

  getTasks$(): Observable<Task[]> {
    return this.tasks$;
  }

  getTask$(id: string | null): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(task => task.id === id))
    );
  }
}
