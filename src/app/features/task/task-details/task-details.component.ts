import { Component, effect, inject, input } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

  id = input<string>();
  returnUrl = input<string>('/');
  task?: Task
  private taskService = inject(TaskService);
  private router = inject(Router);



  constructor() {
    effect(() => {
      const idTask = this.id();

      if (idTask) {
        this.task = this.taskService.getTaskById(idTask);
      } return this.task
    })
  }
  goBack() {
    this.router.navigate([this.returnUrl()]);
  }
}
