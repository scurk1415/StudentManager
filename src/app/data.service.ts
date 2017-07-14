import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable()
export class DataService {
  public data: Student[] = [new Student(123, "test"), new Student(124, "somebody else")];

  constructor() { }

  getStudents(){
    //could be an HTTP call to the server, but I simplyfied it for this task
    return this.data;
  }

  addStudent(student: Student){
    this.data.push(student);
  }

  deleteStudent(student : Student){
    const index = this.data.indexOf(student);
    this.data.splice(index, 1);
  }

}
