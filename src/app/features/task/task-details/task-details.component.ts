import { Component, effect, inject, model } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

  idTaskDetails = model<string>();
  task?: Task
  private taskService = inject(TaskService);


  constructor() {
    effect(() => {
      const idTask = this.idTaskDetails();

      if (idTask) {
        this.task = this.taskService.getTaskById(idTask);
      } return this.task
    })
  }

}
