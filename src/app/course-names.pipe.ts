import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseNames'
})
export class CourseNamesPipe implements PipeTransform {

  transform(value: any, courses?: any): any {
    let names = [];

    if (!value) return "";
    value.forEach(element => {
      var el = courses.find(course => course.id == element).name;
      names.push(el);
    });
    
    return names.join(", ");
  }

}
