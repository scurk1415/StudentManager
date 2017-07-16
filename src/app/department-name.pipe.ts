import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentName'
})
export class DepartmentNamePipe implements PipeTransform {

  transform(value: any, departments?: any): any {
    if (!value) return "";
    return departments.find(dep => dep.id == value).name;
  }

}