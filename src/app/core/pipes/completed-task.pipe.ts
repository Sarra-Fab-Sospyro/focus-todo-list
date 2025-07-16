import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedTask'
})
export class CompletedTaskPipe implements PipeTransform {

  transform(value: boolean): string {

    return value ? "completed-task" : "pending-task";
  }

}
