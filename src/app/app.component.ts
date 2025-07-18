import { Component } from '@angular/core';
import { TasksListComponent } from './features/tasks-list/tasks-list.component';
import { QuoteComponent } from './features/quote/quote.component';
import { TaskFormComponent } from './features/task-form/task-form.component';

@Component({
  selector: 'app-root',
  imports: [TasksListComponent, QuoteComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'focus-todo-list';
  idTask!: string;
  taskSelected(taskId: string) {
    this.idTask = taskId;
  }
}
