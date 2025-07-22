import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

   private router = inject(Router);

  readonly TASKS = 'tasks';
  readonly CREATE_TASKS = 'tasks/new';
  readonly GOALS = 'goals';
  readonly CREATE_GOALS = 'goals/new';
  readonly DASHBOARD = 'dashboard';

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  isActive(route: string) {
    return this.router.url === `/${route}`;
  }
}
