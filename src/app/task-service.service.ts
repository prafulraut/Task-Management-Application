import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
   tasks: any = [];

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: any){
    return this.tasks.find((res:any) => res.id === id);
  }

  addTask(task: any){
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    this.saveTasks();
  }

  markTaskAsCompleted(id: any) {
    const task = this.getTaskById(id);
    if (task) {
      task.isCompleted = true;
      this.saveTasks();
    }
  }

  deleteTask(id: any) {
    this.tasks = this.tasks.filter((res:any) => res.id !== id);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

