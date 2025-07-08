import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Task} from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private db!: IDBDatabase;
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.initDB();
  }

  getTasks$() {
    return this.tasks$.asObservable();
  }

  public initDB() {
    const request = indexedDB.open('TodoDB', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      this.db = request.result;
      this.loadTasks();
    };

    request.onerror = () => {
      console.error('IndexedDB init error:', request.error);
    };
  }

  private loadTasks() {
    const tx = this.db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');
    const request = store.getAll();

    request.onsuccess = () => {
      this.tasks$.next(request.result);
    };

    request.onerror = () => {
      console.error('Failed to load tasks:', request.error);
    };
  }

  addTask(task: Task) {
    const tx = this.db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    const request = store.add(task);

    request.onsuccess = () => this.loadTasks();
    request.onerror = () => console.error('Add error:', request.error);
  }

  updateTask(task: Task) {
    const tx = this.db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    const request = store.put(task);

    request.onsuccess = () => this.loadTasks();
    request.onerror = () => console.error('Update error:', request.error);
  }

  deleteTask(id: number) {
    const tx = this.db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    const request = store.delete(id);

    request.onsuccess = () => this.loadTasks();
    request.onerror = () => console.error('Delete error:', request.error);
  }
}
