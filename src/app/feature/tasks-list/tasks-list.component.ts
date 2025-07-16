import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { CompletedTaskPipe } from '../../core/pipes/completed-task.pipe';
import { TaskFrequency } from '../../core/enums/task-frequency';

@Component({
  selector: 'app-tasks-list',
  imports: [CompletedTaskPipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {

  private taskService = inject(TaskService);
  private allTasks = this.taskService.getTaskList();
  todayListTask = this.taskService.tasksByCategory;
  currentFilter = signal<string>('all');

  listTask = computed(() => {
    const allTasks = this.allTasks();
    const filter = this.currentFilter();

    if (filter === 'all') {
      return allTasks;
    }
    const filteredTasks = allTasks.filter(task => task.frequency === filter)
    return filteredTasks;
  })

  TaskFrequency = TaskFrequency;

  ngOnInit(): void {
    console.log(this.todayListTask().goal);
  }

  onFilterChange(filterType: TaskFrequency | 'all') {
    this.currentFilter.set(filterType);
  }

  changeStatus(id: string) {
    this.taskService.toggleTaskCompleteStaus(id);
  }

}
