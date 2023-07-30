import { Component } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: any = [];
  editTask: any;
  updateData: any;
  editing!: boolean;
  finding: any;
  datafromLocal: any;
  getData: any;
  edit: any;
  filteredUsers!: any[];
  filterBy!: string;

  constructor(private taskService: TaskServiceService) {

  }

  ngOnInit() {
    if (this.tasks === null) {
      this.getDataLocal()
    } else {
      this.tasks = this.taskService.getTasks()
      
    }
    
  }
  getDataLocal() {
    // if (this.tasks.length > 0) {
    //   this.saveEditData()

    // } else {
    this.datafromLocal = localStorage.getItem('tasks');
    this.tasks = JSON.parse(this.datafromLocal);
    console.log(this.tasks);
    // }
  }

  markAsCompleted(id: any) {
    this.taskService.markTaskAsCompleted(id);
  }

  deleteTask(id: any) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  closeEditModal() {
    this.updateData = null;
    this.tasks.reset();
  }

  update(index: any) {
    this.updateData = { ...index }
    this.getDataLocal()
    this.editing = true
  }
  saveEditData() {
    this.finding = this.tasks.findIndex((x: any) => x.id === this.updateData.id)
    this.tasks[this.finding] = this.updateData;
    this.edit = localStorage.setItem('tasks', JSON.stringify(this.tasks))
    console.log(this.edit);
  }

  
  
}


