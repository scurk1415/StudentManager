import { Course } from './../models/Course';
import { Department } from './../models/Department';
import { Faculty } from './../models/Faculty';
import { Student } from './../models/student';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class DataService {
  public data: Student[] = [
    new Student(123, "test", "tester","das","home",1,1,[1]), 
    new Student(124, "somebody","else","0514684230","somewhere",1,1,[1,3])
  ];

  public faculties: Faculty[] = [
    new Faculty(1,"Computer science"),
    new Faculty(2,"Chemisty"),
    new Faculty(3,"History"),
    new Faculty(4,"Sports")
  ];
  
  public departments: Department[] = [
    new Department(1,"Web developement",1), 
    new Department(2,"Artificial inteligence",1),
    new Department(3,"Administration",1),
    new Department(4,"Phisical chemisty",2),
    new Department(5,"Chemical technology",2),
    new Department(6,"Ancient history",3),
    new Department(7,"Modern history",3),
    new Department(8,"Football",4),
    new Department(9,"Basketball",4)  
  ];

  public courses:Course[] = [
    new Course(1,"HTML",1),
    new Course(2,"CSS",1),
    new Course(3,"JavaScript",1),
    new Course(4,"Machine learning",2),
    new Course(5,"Nginx",3),
    new Course(6,"Servers",3),
    new Course(7,"Solar energy",4),
    new Course(8,"Elements",5),
    new Course(9,"Stone age",6),
    new Course(10,"Roman empire",6),
    new Course(11,"WW 1",7),
    new Course(12,"WW 2",7),
    new Course(13,"Rules",8),
    new Course(14,"Clubs",8),
    new Course(15,"Managers",8),
    new Course(16,"Rules",9),
    new Course(17,"NBA",9),
  ];

  public startedEditing = new Subject<Student>();
  public studentsChanged = new EventEmitter<Student[]>();

  constructor() { 
    //this.data = JSON.parse(sessionStorage.getItem("student")) || [];
  }

  getStudents(){
    //could be an HTTP call to the server, but I simplyfied it for this task
    //let data = JSON.parse(sessionStorage.getItem("student")) || [];
    //console.log(data);
    //this.data = data;
    return this.data;
  }
  
  addStudent(student: Student){
    this.data.push(student);
    this.studentsChanged.emit(this.data);
    this.setDataStorage();
  }

  editStudent(student: Student){
    const inArray = this.data.find(std => std.id === student.id);
    const index = this.data.indexOf(inArray);
    this.data[index] = student;    
    this.setDataStorage();
  }

  deleteStudent(student : Student){
    const index = this.data.indexOf(student);
    this.data.splice(index, 1);
    this.setDataStorage();
  }

  setDataStorage(){
    sessionStorage.setItem("student", JSON.stringify(this.data));
  }
}
