import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completed'
})
export class CompletedPipe implements PipeTransform {

  transform(value: boolean): string {

    return value ? "completed-task" : "pending-task";
  }

}
