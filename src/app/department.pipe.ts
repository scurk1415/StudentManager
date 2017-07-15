import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'department'
})
export class DepartmentPipe implements PipeTransform {

  transform(items: any, filter?: any): any {
    if (!items || !filter) {
        return items;
    }

    return items.filter(item => item.faculty_id == filter);
  }
}
