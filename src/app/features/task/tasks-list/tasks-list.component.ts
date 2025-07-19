import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
  Signal,
} from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { CompletedPipe } from '../../../core/pipes/completed.pipe';
import { TaskFrequency } from '../../../core/enums/task-frequency';
import { TaskCategory } from '../../../core/enums/task-category';

type TaskFilter = TaskCategory | 'all';

@Component({
  selector: 'app-tasks-list',
  imports: [CompletedPipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnInit {
  taskSelected = output<string>();

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
    this.taskSelected.emit(id);
    console.log(`id task: ${id}`);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
