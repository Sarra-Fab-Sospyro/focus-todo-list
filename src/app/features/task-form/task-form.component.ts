import { Component, effect, inject, input, model, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskCategory } from '../../core/enums/task-category';
import { TaskFrequency } from '../../core/enums/task-frequency';
import { TaskPriority } from '../../core/enums/task-priority';
import { TaskFormControls } from '../../core/models/task-form-controls.models';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [],
})
export class TaskFormComponent {
  idInput = model<string>();

  formTask!: FormGroup;
  isUpdatedMode = signal<boolean>(false);
  categories = Object.values(TaskCategory);
  frequencies = Object.values(TaskFrequency);
  priorities = Object.values(TaskPriority);

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  constructor() {
    this.initForm();

    effect(() => {
      const idTask = this.idInput();
      if (idTask) {
        this.isUpdatedMode.set(true);
        this.loadTasksForUpdate(idTask);
      } else {
        this.isUpdatedMode.set(false);
      }
    });
  }

  onSubmit() {
    if (this.formTask.invalid) {
      return;
    }

    if (this.isUpdatedMode()) {
      const idTask = this.idInput();
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
    this.idInput.set("");
    this.formTask.reset();
  }

  private initForm() {
    this.formTask = this.fb.group<TaskFormControls>({
      title: this.fb.control('', [Validators.required],),
      category: this.fb.control(null, [Validators.required]),
      priority: this.fb.control(null, [Validators.required]),
      frequency: this.fb.control(null, [Validators.required]),
      description: this.fb.control(''),
      goalId: this.fb.control(''),
      dueDate: this.fb.control(null),
    });
  }

  private loadTasksForUpdate(taskId: string) {
    const task = this.taskService.getTaskById(taskId);

    if (task) {
      this.formTask.patchValue({
        title: task.title,
        category: task.category,
        priority: task.priority,
        frequency: task.frequency,
        description: task.description,
        goalId: task.goalId,
        dueDate: task.dueDate,
      });
    }
  }
}
