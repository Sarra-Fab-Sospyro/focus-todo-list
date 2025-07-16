import { Component } from '@angular/core';
import { TasksListComponent } from './feature/tasks-list/tasks-list.component';
import { QuoteComponent } from './feature/quote/quote.component';

@Component({
  selector: 'app-root',
  imports: [TasksListComponent, QuoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'focus-todo-list';
}
