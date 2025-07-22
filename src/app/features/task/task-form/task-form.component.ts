import { Component, effect, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskCategory } from '../../../core/enums/task-category';
import { TaskPriority } from '../../../core/enums/task-priority';
import { TaskFormControls } from '../../../core/models/task-form-controls.models';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [],
})
export class TaskFormComponent {
  id = input<string>();
  returnUrl = input<string>('/tasks');

  formTask!: FormGroup;
  isUpdatedMode = signal<boolean>(false);
  categories = Object.values(TaskCategory);
  priorities = Object.values(TaskPriority);

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  constructor() {
    this.initForm();

    effect(() => {
      const idTask = this.id();
      if (idTask) {
        this.isUpdatedMode.set(true);
        this.loadTasksForUpdate(idTask);
      } else {
        this.isUpdatedMode.set(false);
      }
    });
  };

  onSubmit() {
    if (this.formTask.invalid) {
      return;
    }

    if (this.isUpdatedMode()) {
      const idTask = this.id();
      if (idTask) {
        const taskUpdated = {
          ...this.formTask.value,
          updatedAt: new Date(),
        };
        this.taskService.updateTask(idTask, taskUpdated);
      }
    } else {
      this.taskService.addTask(this.formTask.value);
    }

    this.resetForm();
    this.router.navigate([this.returnUrl() || '/tasks']);
  };

  onCancel() {
    this.resetForm();
  };

  private resetForm() {
    this.formTask.removeControl('isCompleted')
    this.formTask.reset();
  };

  private initForm() {
    this.formTask = this.fb.group<TaskFormControls>({
      title: this.fb.control('', [Validators.required],),
      category: this.fb.control(null, [Validators.required]),
      priority: this.fb.control(null, [Validators.required]),
      goalId: this.fb.control(''),
    });
  };

  private loadTasksForUpdate(taskId: string) {
    const task = this.taskService.getTaskById(taskId);

    if (task) {

      this.formTask.addControl(
        'isCompleted',
        this.fb.control(task.isCompleted ?? false)
      );

      this.formTask.patchValue({
        title: task.title,
        category: task.category,
        priority: task.priority,
        goalId: task.goalId,
        dueDate: task.dueDate,
      });
    }
  };
}
