import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable()
export class DataService {
  public data: Student[];

  constructor() { }

  addStudent(student: Student){
    this.data.push(student);
  }

  deleteStudent(student : Student){
    const index = this.data.indexOf(student);
    this.data.splice(index, 1);
  }

}
