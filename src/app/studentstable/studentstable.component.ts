import { Department } from './../../models/Department';
import { Faculty } from './../../models/Faculty';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Student } from '../../models/student';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from '../popup/popup.component';
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "ngx-bootstrap";
import { Course } from "../../models/Course";

@Component({
  selector: 'app-studentstable',
  templateUrl: './studentstable.component.html',
  styleUrls: ['./studentstable.component.css']
})
export class StudentstableComponent implements OnInit, OnDestroy {
  
  students: Student[] = [];
  faculties: Faculty[] = [];
  departments: Department[] = [];
  courses: Course[] = [];
  selectedStudent: Student;
  bigCurrentPage:number = 1;
  maxSize:number = 5;
  rows;
  itemsPerPage:number = 5;

  sortConfig = [
    { title:'Student number', class:'col-md-2', canSort: true, sortProperty:'student_number',sortDirection:'asc'},
    { title:'Name', class:'col-md-2', canSort: true, sortProperty:'name',sortDirection:'asc'},
    { title:'Faculty', class:'col-md-2', canSort: true, sortProperty:'faculty',sortDirection:'asc'},
    { title:'Department', class:'col-md-2', canSort: true, sortProperty:'department',sortDirection:'asc'},
    { title:'Courses', class:'col-md-2', canSort: false},
    { title:'', class:'col-md-2', canSort: false}
  ];
  subscription: Subscription;
  searchFilter: string = "";

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.students = this._dataSvc.getStudents();
    this.faculties = this._dataSvc.faculties;
    this.departments = this._dataSvc.departments;
    this.courses = this._dataSvc.courses;
    
    this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage});

    this.subscription = this._dataSvc.studentsChanged.subscribe(
      (students: Student[])=> {
        this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage});
      }
    );
  }

  onFilterChange(value: string){
    value = value.toLowerCase();
    this.searchFilter = value;

    let data = this.students.filter(student => {
      //can be switched with indexOf if we want to check if the property contains the value (now we check if its starts with)
      return student.student_number.toString().startsWith(value) || 
            student.name.toLowerCase().startsWith(value) ||
            student.surname.toLowerCase().startsWith(value) ||
            this.faculties.find(faculty => faculty.name.toLowerCase().startsWith(value) && faculty.id == student.faculty) ||
            this.departments.find(dep => dep.name.toLowerCase().startsWith(value) && dep.id == student.department) ||
            this.courses.find(course => course.name.toLowerCase().startsWith(value) && student.courses.indexOf(course.id) >-1);
    });

    this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage}, data, true);
    return data;
  }

  onSort(columnConfig: any){
    if(columnConfig.canSort){
      const data = this.onFilterChange(this.searchFilter);
      
      let sortedData = this.changeSort(data, columnConfig);

      switch (columnConfig.sortDirection) {
        case 'desc':
          columnConfig.sortDirection = 'asc';
          break;
      
        default:
          columnConfig.sortDirection = 'desc';
          break;
      }

      this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage},sortedData, true);
    }
  }

  changeSort(data, config){

    return data.sort((previous:any, current:any) => {
      let nameA = previous[config.sortProperty]; // ignore upper and lowercase
      let nameB = current[config.sortProperty]; // ignore upper and lowercase
      let sort:string = config.sortDirection;

      if (nameA > nameB) {
        return sort === 'desc' ? -1 : 1;
      } else if (nameA < nameB) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });

  }

  onViewStudent(student: Student){
    this.selectedStudent = student;
  }

  onEditStudent(student: Student){
    this._dataSvc.startedEditing.next(student);
  }

  onDeleteStudent(student: Student){
    this._dataSvc.deleteStudent(student);
  }

  onPageChange(page:any, data?: Student[], forceData?: boolean) {
    var array = this.students;
    if(forceData){
      array = data;
    }

    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : array.length;
    this.rows = array.slice(start, end);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
