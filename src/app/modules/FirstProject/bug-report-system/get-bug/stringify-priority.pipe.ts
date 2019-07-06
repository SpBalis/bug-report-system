import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyPriority'
})
export class StringifyPriorityPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    if (value === 1) {
      return 'Critical';
    }
    if (value === 2) {
      return 'Major';
    } else {
      return 'Minor';
    }
  }
}
