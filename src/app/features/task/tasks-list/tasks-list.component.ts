import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TaskCategory } from '../../../core/enums/task-category';
import { CompletedPipe } from '../../../core/pipes/completed.pipe';
import { TaskService } from '../../../core/services/task.service';

type TaskFilter = TaskCategory | 'all';

@Component({
  selector: 'app-tasks-list',
  imports: [CompletedPipe, MatCheckboxModule, MatIconModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnInit {
  currentFilter = signal<string>('all');

  listTask = computed(() => {
    const allTasks = this.allTasks();
    const filter = this.currentFilter();

    if (filter === 'all') {
      return allTasks;
    }
    const filteredTasks = allTasks.filter((task) => task.category === filter);
    return filteredTasks;
  });

  private router = inject(Router);
  private taskService = inject(TaskService);
  private allTasks = this.taskService.getTaskList();
  protected readonly taskFilters: TaskFilter[] = [
    ...Object.values(TaskCategory),
    'all'

  ];

  ngOnInit(): void { }

  onFilterChange(filterType: TaskFilter) {
    this.currentFilter.set(filterType);
  }

  toggleTaskStatus(id: string) {
    this.taskService.toggleTaskCompleteStaus(id);
  }

  selectTask(id: string) {
    this.router.navigate([`tasks/${id}`],
      {
        queryParams: { returnUrl: this.router.url }
      }
    );
    console.log(`id task: ${id}`);
  }

  updateTask(id: string) {
    this.router.navigate([`tasks/${id}/edit`],
      {
        queryParams: { returnUrl: this.router.url }
      }
    );
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  toNewTask() {
    this.router.navigate([`tasks/new`]);
  }
}
