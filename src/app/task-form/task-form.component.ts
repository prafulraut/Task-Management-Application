import { Component } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm:any = FormGroup;
  tasks: any[] = [];

  constructor( private taskService: TaskServiceService,private router:Router) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      title:new FormControl ('', Validators.required),
      description:new FormControl  ('', Validators.required),
      dueDate:new FormControl  ('', Validators.required),
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      task.isCompleted = false;
      this.taskService.addTask(task);
      this.resetForm();
    }
    this.router.navigate(['/taskList'])

  }

  resetForm() {
    this.taskForm.reset();
  }
}
