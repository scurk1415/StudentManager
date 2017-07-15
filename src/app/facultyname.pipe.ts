import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facultyname'
})
export class FacultynamePipe implements PipeTransform {

  transform(value: any, options?: any): any {
    if (!value) return "";

    return options.find(faculty => faculty.id == value).name;
  }

}
